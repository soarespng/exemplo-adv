-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  service TEXT,
  budget TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Policy for inserting (anyone can submit a contact form)
CREATE POLICY "Anyone can insert contact submissions" 
ON contact_submissions FOR INSERT 
TO authenticated, anon
WITH CHECK (true);

-- Policy for viewing (only authenticated users can view)
CREATE POLICY "Authenticated users can view contact submissions" 
ON contact_submissions FOR SELECT 
TO authenticated
USING (true);

-- Policy for updating (only authenticated users can update)
CREATE POLICY "Authenticated users can update contact submissions" 
ON contact_submissions FOR UPDATE 
TO authenticated
USING (true)
WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_contact_submissions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update updated_at timestamp
CREATE TRIGGER update_contact_submissions_updated_at
BEFORE UPDATE ON contact_submissions
FOR EACH ROW
EXECUTE FUNCTION update_contact_submissions_updated_at();

