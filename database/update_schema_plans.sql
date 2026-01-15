-- Add plan_type column to vip_subscriptions to distinguish between plans
ALTER TABLE vip_subscriptions ADD COLUMN plan_type VARCHAR(50) DEFAULT 'core_v3';

-- Example insert for testing (Elite 30 min)
-- INSERT INTO vip_subscriptions (user_id, start_time, end_time, status, plan_type) 
-- VALUES ('USER_UUID', NOW(), DATE_ADD(NOW(), INTERVAL 30 MINUTE), 'active', 'elite_v6');
