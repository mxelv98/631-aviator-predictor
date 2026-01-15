# Database Logic Mapping

## 1. User Logic

### User Registration
```sql
INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'user');
```

### User Login
```sql
SELECT * FROM users WHERE email = ?;
-- Verify password hash in application logic
```

### User Payment (Stripe/Crypto Callback)
**Logic:** Insert into payments with status 'success'. Do NOT activate VIP automatically.
```sql
INSERT INTO payments (user_id, amount, method, status) VALUES (?, ?, ?, 'success');
```

## 2. Admin Logic

### View Pending VIP Requests (Payments made but no active VIP)
**Business Logic:** Show payments where status='success' and user does not have an active VIP subscription.
```sql
SELECT p.*, u.name, u.email 
FROM payments p
JOIN users u ON p.user_id = u.id
LEFT JOIN vip_subscriptions v ON p.user_id = v.user_id AND v.status = 'active'
WHERE p.status = 'success' 
  AND v.id IS NULL;
```

### Activate VIP (Manual by Admin)
**Business Logic:** Admin activates VIP for 30 minutes.
```sql
INSERT INTO vip_subscriptions (user_id, start_time, end_time, status, activated_by_admin) 
VALUES (?, NOW(), NOW() + INTERVAL 30 MINUTE, 'active', TRUE);

-- Log this action
INSERT INTO admin_logs (admin_id, action) VALUES (?, 'Activated VIP for user ' || ?);
```

### Extend VIP
**Business Logic:** Admin extends current VIP end time by X minutes.
```sql
UPDATE vip_subscriptions 
SET end_time = end_time + INTERVAL ? MINUTE 
WHERE user_id = ? AND status = 'active';

-- Log action
INSERT INTO admin_logs (admin_id, action) VALUES (?, 'Extended VIP for user ' || ? || ' by ' || ? || ' minutes');
```

### Cancel VIP
**Business Logic:** Admin cancels VIP explicitly.
```sql
UPDATE vip_subscriptions 
SET status = 'expired' 
WHERE user_id = ? AND status = 'active';

-- Log action
INSERT INTO admin_logs (admin_id, action) VALUES (?, 'Cancelled VIP for user ' || ?);
```

## 3. System Background Jobs / Middlewares

### Check VIP Status (On every request or cron job)
**Logic:** Check if user has active VIP that hasn't expired.
```sql
SELECT * FROM vip_subscriptions 
WHERE user_id = ? AND status = 'active' AND end_time > NOW();
```

### Expire VIPs (Scheduled Job or Lazy Check)
**Logic:** If `NOW() > end_time` and status is still 'active', mark as expired.
```sql
UPDATE vip_subscriptions 
SET status = 'expired' 
WHERE status = 'active' AND end_time < NOW();
```
