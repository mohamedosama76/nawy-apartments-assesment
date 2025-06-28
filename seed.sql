-- Clear existing data
DELETE FROM "Apartment";
DELETE FROM "Project";

-- Insert projects
INSERT INTO "Project" (id, name, location, description, "createdAt", "updatedAt") 
VALUES 
(1, 'Madinaty', 'New Cairo', 'A modern residential compound in New Cairo', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'October Park', '6th of October City', 'Luxury apartments with green spaces', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert apartments
INSERT INTO "Apartment" (
  "unitName", 
  "unitNumber", 
  area, 
  bedrooms, 
  bathrooms, 
  price, 
  description, 
  status, 
  "projectId", 
  "createdAt", 
  "updatedAt"
) VALUES 
('Garden View', 'A101', 120, 2, 2, 1500000, 'Beautiful apartment with garden view', 'available', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Corner Unit', 'A102', 150, 3, 2, 2200000, 'Spacious corner unit with extra windows', 'available', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Penthouse', 'A301', 200, 4, 3, 3500000, 'Luxurious penthouse with private terrace', 'available', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Pool View', 'B101', 110, 2, 1, 1200000, 'Cozy unit overlooking the swimming pool', 'available', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Duplex', 'B201', 180, 3, 2, 2800000, 'Modern duplex with high ceilings', 'available', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP); 