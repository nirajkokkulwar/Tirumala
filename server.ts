import express from 'express';
import path from 'path';
import { db } from './server/db';
import { parseStyleQuery } from './server/intentParser';
import { RecommendationService } from './server/recommendationService';
import { AppNotification, Appointment, InspirationRequest, SavedVisitItem } from './src/types';

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '15mb' }));

  // ==========================================
  // AUTH & USER PROFILE
  // ==========================================
  app.get('/api/auth/me', (req, res) => {
    res.json(db.currentUser);
  });

  app.post('/api/auth/switch-role', (req, res) => {
    const { role } = req.body;
    const target = db.users.find(u => u.role === role);
    if (target) {
      db.currentUser = target;
      return res.json({ success: true, user: db.currentUser });
    }
    return res.status(400).json({ error: 'Role not found' });
  });

  // ==========================================
  // PRODUCTS CATALOG
  // ==========================================
  app.get('/api/products', (req, res) => {
    let result = [...db.products];
    const { category, gender, style, occasion, minPrice, maxPrice, search, inStock } = req.query;

    if (category && typeof category === 'string') {
      result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    if (gender && typeof gender === 'string') {
      result = result.filter(p => p.gender.toLowerCase() === gender.toLowerCase());
    }

    if (style && typeof style === 'string') {
      result = result.filter(p => p.style.toLowerCase() === style.toLowerCase());
    }

    if (occasion && typeof occasion === 'string') {
      result = result.filter(p => p.occasion.some(o => o.toLowerCase() === occasion.toLowerCase()));
    }

    if (minPrice) {
      const min = Number(minPrice);
      if (!isNaN(min)) result = result.filter(p => p.price >= min);
    }

    if (maxPrice) {
      const max = Number(maxPrice);
      if (!isNaN(max)) result = result.filter(p => p.price <= max);
    }

    if (inStock === 'true') {
      result = result.filter(p => p.inStock);
    }

    if (search && typeof search === 'string') {
      const q = search.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q) ||
        p.color.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    res.json(result);
  });

  app.get('/api/products/:id', (req, res) => {
    const product = db.products.find(p => p.id === req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  });

  // Recommendations: "You May Also Like"
  app.get('/api/recommendations/:productId', (req, res) => {
    const product = db.products.find(p => p.id === req.params.productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    const recs = RecommendationService.getRecommendationsForProduct(product, db.products, 4);
    res.json(recs);
  });

  // ==========================================
  // TIRUMALA STYLE ASSISTANT (INTENT PARSER)
  // ==========================================
  app.post('/api/style-assistant/search', (req, res) => {
    const { query } = req.body;
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const { params, explanation } = parseStyleQuery(query);

    let matching = [...db.products];

    if (params.category) {
      matching = matching.filter(p => p.category === params.category);
    }

    if (params.gender) {
      matching = matching.filter(p => p.gender === params.gender || p.gender === 'unisex');
    }

    if (params.style) {
      matching = matching.filter(p => p.style === params.style);
    }

    if (params.occasion) {
      matching = matching.filter(p => p.occasion.includes(params.occasion!));
    }

    if (params.budgetMax) {
      matching = matching.filter(p => p.price <= params.budgetMax!);
    }

    if (params.budgetMin) {
      matching = matching.filter(p => p.price >= params.budgetMin!);
    }

    if (params.fabric) {
      const f = params.fabric.toLowerCase();
      matching = matching.filter(p => p.fabric.toLowerCase().includes(f));
    }

    if (params.color) {
      const c = params.color.toLowerCase();
      matching = matching.filter(p => p.color.toLowerCase().includes(c));
    }

    // If too strict, fallback to top scored products rather than zero
    if (matching.length === 0) {
      matching = db.products.filter(p => {
        if (params.category && p.category !== params.category) return false;
        if (params.budgetMax && p.price > params.budgetMax * 1.3) return false;
        return true;
      });
    }

    res.json({
      rawQuery: query,
      parsedParams: params,
      explanation,
      matchingProducts: matching.slice(0, 8)
    });
  });

  // ==========================================
  // SAVE FOR VISIT
  // ==========================================
  app.get('/api/visits/saved-items', (req, res) => {
    const items = db.savedVisitItems.filter(item => item.userId === db.currentUser.id);
    res.json(items);
  });

  app.post('/api/visits/saved-items', (req, res) => {
    const { productId, selectedSize, customerNote, appointmentId } = req.body;
    const product = db.products.find(p => p.id === productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check if already saved for visit
    const existing = db.savedVisitItems.find(
      i => i.userId === db.currentUser.id && i.productId === productId
    );

    if (existing) {
      if (selectedSize) existing.selectedSize = selectedSize;
      if (customerNote !== undefined) existing.customerNote = customerNote;
      if (appointmentId !== undefined) existing.appointmentId = appointmentId;
      return res.json(existing);
    }

    const defaultAppointment = appointmentId || (db.appointments.find(a => a.userId === db.currentUser.id && a.status !== 'COMPLETED' && a.status !== 'CANCELLED')?.id);

    const newItem: SavedVisitItem = {
      id: `sv-${Date.now()}`,
      userId: db.currentUser.id,
      productId,
      product,
      selectedSize: selectedSize || product.availableSizes[0],
      selectedColor: product.color,
      customerNote: customerNote || '',
      appointmentId: defaultAppointment,
      preparationStatus: 'PREPARING',
      createdAt: new Date().toISOString()
    };

    db.savedVisitItems.unshift(newItem);

    // If associated with appointment, link it
    if (newItem.appointmentId) {
      const apt = db.appointments.find(a => a.id === newItem.appointmentId);
      if (apt && !apt.savedItemIds.includes(newItem.id)) {
        apt.savedItemIds.push(newItem.id);
      }
    }

    res.status(201).json(newItem);
  });

  app.delete('/api/visits/saved-items/:id', (req, res) => {
    const index = db.savedVisitItems.findIndex(
      i => i.id === req.params.id && (i.userId === db.currentUser.id || db.currentUser.role !== 'CUSTOMER')
    );
    if (index === -1) {
      return res.status(404).json({ error: 'Saved item not found' });
    }

    const item = db.savedVisitItems[index];
    if (item.appointmentId) {
      const apt = db.appointments.find(a => a.id === item.appointmentId);
      if (apt) {
        apt.savedItemIds = apt.savedItemIds.filter(id => id !== item.id);
      }
    }

    db.savedVisitItems.splice(index, 1);
    res.json({ success: true });
  });

  // Move Saved Visit Item -> Wishlist
  app.post('/api/visits/saved-items/:id/move-to-wishlist', (req, res) => {
    const item = db.savedVisitItems.find(i => i.id === req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Add to wishlist if not present
    if (!db.wishlist.some(w => w.userId === db.currentUser.id && w.productId === item.productId)) {
      db.wishlist.push({
        id: `w-${Date.now()}`,
        userId: db.currentUser.id,
        productId: item.productId,
        addedAt: new Date().toISOString()
      });
    }

    // Remove from visit items
    db.savedVisitItems = db.savedVisitItems.filter(i => i.id !== req.params.id);

    res.json({ success: true, message: 'Moved to Wishlist' });
  });

  // Move Wishlist item -> Save for Visit
  app.post('/api/wishlist/:productId/move-to-visit', (req, res) => {
    const { productId } = req.params;
    const product = db.products.find(p => p.id === productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Add to saved visit items
    const defaultAppointment = db.appointments.find(
      a => a.userId === db.currentUser.id && a.status !== 'COMPLETED' && a.status !== 'CANCELLED'
    )?.id;

    if (!db.savedVisitItems.some(i => i.userId === db.currentUser.id && i.productId === productId)) {
      const newItem: SavedVisitItem = {
        id: `sv-${Date.now()}`,
        userId: db.currentUser.id,
        productId,
        product,
        selectedSize: product.availableSizes[0],
        selectedColor: product.color,
        customerNote: '',
        appointmentId: defaultAppointment,
        preparationStatus: 'PREPARING',
        createdAt: new Date().toISOString()
      };
      db.savedVisitItems.unshift(newItem);
      if (defaultAppointment) {
        const apt = db.appointments.find(a => a.id === defaultAppointment);
        if (apt) apt.savedItemIds.push(newItem.id);
      }
    }

    // Remove from wishlist
    db.wishlist = db.wishlist.filter(w => !(w.userId === db.currentUser.id && w.productId === productId));

    res.json({ success: true, message: 'Moved to Save for Visit' });
  });

  // Assign or remove appointment association for saved visit item
  app.patch('/api/visits/saved-items/:id/appointment', (req, res) => {
    const item = db.savedVisitItems.find(i => i.id === req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    const { appointmentId } = req.body;
    item.appointmentId = appointmentId || undefined;
    res.json(item);
  });

  // ==========================================
  // WISHLIST
  // ==========================================
  app.get('/api/wishlist', (req, res) => {
    const userWishlist = db.wishlist.filter(w => w.userId === db.currentUser.id);
    const products = userWishlist
      .map(w => db.products.find(p => p.id === w.productId))
      .filter(Boolean);
    res.json(products);
  });

  app.post('/api/wishlist/toggle', (req, res) => {
    const { productId } = req.body;
    const index = db.wishlist.findIndex(w => w.userId === db.currentUser.id && w.productId === productId);
    if (index > -1) {
      db.wishlist.splice(index, 1);
      return res.json({ inWishlist: false });
    } else {
      db.wishlist.push({
        id: `w-${Date.now()}`,
        userId: db.currentUser.id,
        productId,
        addedAt: new Date().toISOString()
      });
      return res.json({ inWishlist: true });
    }
  });

  // ==========================================
  // APPOINTMENTS & VISIT CONSULTATION
  // ==========================================
  app.get('/api/appointments', (req, res) => {
    // If staff/admin, return all appointments; else return current user's appointments
    if (db.currentUser.role !== 'CUSTOMER') {
      return res.json(db.appointments);
    }
    const userAppointments = db.appointments.filter(a => a.userId === db.currentUser.id);
    res.json(userAppointments);
  });

  app.get('/api/appointments/history', (req, res) => {
    if (db.currentUser.role !== 'CUSTOMER') {
      return res.json(db.pastVisits);
    }
    const userHistory = db.pastVisits.filter(a => a.userId === db.currentUser.id);
    res.json(userHistory);
  });

  app.post('/api/appointments', (req, res) => {
    const { date, timeSlot, visitNotes, budgetRange, selectedItemIds, inspirationRequestId } = req.body;

    if (!date || !timeSlot) {
      return res.status(400).json({ error: 'Date and time slot are required' });
    }

    const newApt: Appointment = {
      id: `apt-${Date.now()}`,
      userId: db.currentUser.id,
      customerName: db.currentUser.name,
      customerPhone: db.currentUser.phone,
      date,
      timeSlot,
      status: 'PREPARING',
      visitNotes: visitNotes || '',
      budgetRange: budgetRange || '₹2,000–₹5,000',
      savedItemIds: selectedItemIds || [],
      inspirationRequestId: inspirationRequestId || undefined,
      assignedStylist: 'Senior Draper Priya',
      createdAt: new Date().toISOString()
    };

    db.appointments.unshift(newApt);

    // Link saved visit items to this appointment
    if (selectedItemIds && Array.isArray(selectedItemIds)) {
      selectedItemIds.forEach(itemId => {
        const item = db.savedVisitItems.find(i => i.id === itemId);
        if (item) item.appointmentId = newApt.id;
      });
    }

    // Award 50 bonus reward coins for scheduling
    db.currentUser.rewardCoins += 50;
    db.rewardsHistory.unshift({
      id: `rew-${Date.now()}`,
      userId: db.currentUser.id,
      amount: 50,
      type: 'earned',
      description: `Boutique Visit Scheduled (${date}, ${timeSlot})`,
      date: new Date().toISOString().split('T')[0],
      appointmentId: newApt.id
    });

    // Create Notification
    db.notifications.unshift({
      id: `notif-${Date.now()}`,
      userId: db.currentUser.id,
      title: 'Appointment Confirmed',
      message: `Your Tirumala store visit is confirmed for ${date} at ${timeSlot}. Stylist Priya has been assigned.`,
      type: 'appointment',
      isRead: false,
      createdAt: new Date().toISOString()
    });

    res.status(201).json(newApt);
  });

  app.patch('/api/appointments/:id/status', (req, res) => {
    const { status } = req.body;
    const apt = db.appointments.find(a => a.id === req.params.id);
    if (!apt) return res.status(404).json({ error: 'Appointment not found' });

    apt.status = status;

    if (status === 'ARRIVED') {
      apt.arrivedAt = new Date().toISOString();
      db.notifications.unshift({
        id: `notif-${Date.now()}`,
        userId: apt.userId,
        title: 'Welcome to Tirumala!',
        message: 'You have arrived at our boutique. Master draper Priya is ready to attend to you.',
        type: 'preparation',
        isRead: false,
        createdAt: new Date().toISOString()
      });
    } else if (status === 'READY') {
      db.notifications.unshift({
        id: `notif-${Date.now()}`,
        userId: apt.userId,
        title: 'Your Garments Are Ready',
        message: 'All your saved pieces have been arranged in Dressing Suite 3 for your visit.',
        type: 'preparation',
        isRead: false,
        createdAt: new Date().toISOString()
      });
    }

    res.json(apt);
  });

  // Get preparation details for appointment
  app.get('/api/appointments/:id/preparation', (req, res) => {
    const apt = db.appointments.find(a => a.id === req.params.id);
    if (!apt) return res.status(404).json({ error: 'Appointment not found' });

    const items = db.savedVisitItems.filter(i => apt.savedItemIds.includes(i.id) || i.appointmentId === apt.id);
    const inspiration = apt.inspirationRequestId ? db.inspirationRequests.find(i => i.id === apt.inspirationRequestId) : undefined;
    const customer = db.users.find(u => u.id === apt.userId) || db.currentUser;

    res.json({
      appointment: apt,
      customer,
      items,
      inspiration
    });
  });

  // Staff updates preparation status of an individual item
  app.patch('/api/admin/visit-items/:id', (req, res) => {
    const item = db.savedVisitItems.find(i => i.id === req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    const { status, alternativeNote } = req.body;
    item.preparationStatus = status;

    if (alternativeNote) {
      item.staffAlternativeNote = alternativeNote;
    }

    // If UNAVAILABLE, trigger customer notification
    if (status === 'UNAVAILABLE') {
      db.notifications.unshift({
        id: `notif-${Date.now()}`,
        userId: item.userId,
        title: 'Item Unavailable — Alternatives Ready',
        message: `One of your saved items (${item.product.name}) is currently unavailable. We have selected 2 similar fine weaves for your visit.`,
        type: 'preparation',
        isRead: false,
        createdAt: new Date().toISOString()
      });
    }

    res.json(item);
  });

  // Staff records in-store purchase & credits rewards
  app.post('/api/admin/appointments/:id/record-purchase', (req, res) => {
    const apt = db.appointments.find(a => a.id === req.params.id);
    if (!apt) return res.status(404).json({ error: 'Appointment not found' });

    const { amount } = req.body;
    const purchaseAmount = Number(amount);
    if (isNaN(purchaseAmount) || purchaseAmount <= 0) {
      return res.status(400).json({ error: 'Valid purchase amount required' });
    }

    // 5% coins back
    const earnedCoins = Math.round(purchaseAmount * 0.05);

    apt.status = 'COMPLETED';
    apt.purchaseTotal = purchaseAmount;
    apt.coinsEarned = earnedCoins;
    apt.completedAt = new Date().toISOString();

    const customer = db.users.find(u => u.id === apt.userId);
    if (customer) {
      customer.rewardCoins += earnedCoins;
    }

    // Record reward transaction
    db.rewardsHistory.unshift({
      id: `rew-${Date.now()}`,
      userId: apt.userId,
      amount: earnedCoins,
      type: 'earned',
      description: `5% Coin Back on Physical Boutique Purchase (₹${purchaseAmount.toLocaleString('en-IN')})`,
      date: new Date().toISOString().split('T')[0],
      appointmentId: apt.id
    });

    // Move appointment to pastVisits
    db.pastVisits.unshift({ ...apt });

    // Send customer notification
    db.notifications.unshift({
      id: `notif-${Date.now()}`,
      userId: apt.userId,
      title: 'Purchase Recorded & Reward Coins Earned!',
      message: `Thank you for visiting Tirumala Cloth Store. Your in-store purchase of ₹${purchaseAmount.toLocaleString('en-IN')} earned you ${earnedCoins} Tirumala Reward Coins!`,
      type: 'rewards',
      isRead: false,
      createdAt: new Date().toISOString()
    });

    res.json({
      success: true,
      appointment: apt,
      earnedCoins,
      newBalance: customer?.rewardCoins || 0
    });
  });

  // ==========================================
  // BRING YOUR INSPIRATION (PRIVATE CONSULTATION)
  // ==========================================
  app.get('/api/inspiration', (req, res) => {
    if (db.currentUser.role !== 'CUSTOMER') {
      return res.json(db.inspirationRequests);
    }
    const userRequests = db.inspirationRequests.filter(r => r.userId === db.currentUser.id);
    res.json(userRequests);
  });

  app.get('/api/inspiration/:id', (req, res) => {
    const request = db.inspirationRequests.find(r => r.id === req.params.id);
    if (!request) return res.status(404).json({ error: 'Inspiration request not found' });

    // Privacy check: only owner or staff/admin
    if (db.currentUser.role === 'CUSTOMER' && request.userId !== db.currentUser.id) {
      return res.status(403).json({ error: 'Access denied to private inspiration request' });
    }

    // Customer safe response: strip internal staff notes if customer
    if (db.currentUser.role === 'CUSTOMER') {
      const { staffNotes, ...safeRequest } = request;
      return res.json(safeRequest);
    }

    res.json(request);
  });

  app.post('/api/inspiration', (req, res) => {
    const {
      imageUrl,
      category,
      gender,
      style,
      approxBudget,
      preferredColor,
      description,
      preferredVisitDate,
      appointmentId
    } = req.body;

    if (!category || !description) {
      return res.status(400).json({ error: 'Category and description are required' });
    }

    // Default image if not supplied
    const finalImageUrl = imageUrl || 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80';

    const newRequest: InspirationRequest = {
      id: `insp-${Date.now()}`,
      userId: db.currentUser.id,
      customerName: db.currentUser.name,
      customerPhone: db.currentUser.phone,
      imageUrl: finalImageUrl,
      category: category || 'men',
      gender: gender || 'men',
      style: style || 'traditional',
      approxBudget: approxBudget || '₹2,000–₹5,000',
      preferredColor: preferredColor || 'Any',
      description,
      preferredVisitDate: preferredVisitDate || 'Flexible',
      appointmentId: appointmentId || undefined,
      status: 'PENDING',
      customerMessage: "We've received your inspiration request. Our team will review it and prepare suitable options for your visit.",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    db.inspirationRequests.unshift(newRequest);

    // Notification
    db.notifications.unshift({
      id: `notif-${Date.now()}`,
      userId: db.currentUser.id,
      title: 'Inspiration Received',
      message: "We've received your clothing inspiration request. Our styling team will curate matching weaves for your visit.",
      type: 'inspiration',
      isRead: false,
      createdAt: new Date().toISOString()
    });

    res.status(201).json(newRequest);
  });

  // Staff updates inspiration request status & notes
  app.patch('/api/admin/inspiration/:id', (req, res) => {
    const request = db.inspirationRequests.find(r => r.id === req.params.id);
    if (!request) return res.status(404).json({ error: 'Request not found' });

    const { status, staffNotes, customerMessage } = req.body;
    if (status) request.status = status;
    if (staffNotes !== undefined) request.staffNotes = staffNotes;
    if (customerMessage !== undefined) request.customerMessage = customerMessage;
    request.updatedAt = new Date().toISOString();

    if (status === 'PREPARING') {
      db.notifications.unshift({
        id: `notif-${Date.now()}`,
        userId: request.userId,
        title: 'Preparation Started',
        message: 'Our boutique team is preparing suitable matching options for your inspiration request.',
        type: 'preparation',
        isRead: false,
        createdAt: new Date().toISOString()
      });
    } else if (status === 'READY') {
      db.notifications.unshift({
        id: `notif-${Date.now()}`,
        userId: request.userId,
        title: 'Inspiration Curated & Ready',
        message: 'Selected weaves inspired by your reference are now tagged and waiting for you at the store.',
        type: 'inspiration',
        isRead: false,
        createdAt: new Date().toISOString()
      });
    }

    res.json(request);
  });

  // ==========================================
  // REWARDS
  // ==========================================
  app.get('/api/rewards', (req, res) => {
    const history = db.rewardsHistory.filter(h => h.userId === db.currentUser.id);
    res.json({
      balance: db.currentUser.rewardCoins,
      tier: db.currentUser.memberTier,
      history
    });
  });

  // ==========================================
  // NOTIFICATIONS
  // ==========================================
  app.get('/api/notifications', (req, res) => {
    const list = db.notifications.filter(n => n.userId === db.currentUser.id);
    res.json(list);
  });

  app.patch('/api/notifications/:id/read', (req, res) => {
    const notif = db.notifications.find(n => n.id === req.params.id);
    if (notif) notif.isRead = true;
    res.json({ success: true });
  });

  app.post('/api/notifications/mark-all-read', (req, res) => {
    db.notifications
      .filter(n => n.userId === db.currentUser.id)
      .forEach(n => (n.isRead = true));
    res.json({ success: true });
  });

  // ==========================================
  // VITE MIDDLEWARE (DEV) / STATIC SERVE (PROD)
  // ==========================================
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Tirumala Cloth Store server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
