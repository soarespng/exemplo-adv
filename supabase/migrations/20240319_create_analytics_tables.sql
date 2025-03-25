-- Tabela para armazenar visitas ao site
CREATE TABLE page_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_path TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  ip_address TEXT,
  session_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  country TEXT,
  city TEXT,
  device_type TEXT
);

-- Índices para otimizar consultas
CREATE INDEX idx_page_views_created_at ON page_views(created_at);
CREATE INDEX idx_page_views_page_path ON page_views(page_path);

-- Tabela para armazenar eventos de clique
CREATE TABLE click_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_name TEXT NOT NULL,
  element_id TEXT,
  element_class TEXT,
  page_path TEXT NOT NULL,
  session_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para otimizar consultas
CREATE INDEX idx_click_events_created_at ON click_events(created_at);
CREATE INDEX idx_click_events_event_name ON click_events(event_name);

-- Tabela para armazenar dados agregados diários (para otimização)
CREATE TABLE daily_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL,
  page_path TEXT NOT NULL,
  view_count INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(date, page_path)
);

-- Função para atualizar o timestamp de updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar o timestamp de updated_at
CREATE TRIGGER update_daily_metrics_updated_at
BEFORE UPDATE ON daily_metrics
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Política RLS para proteger os dados
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE click_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_metrics ENABLE ROW LEVEL SECURITY;

-- Políticas para permitir apenas usuários autenticados acessarem os dados
CREATE POLICY "Allow authenticated users to select page_views"
  ON page_views FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to select click_events"
  ON click_events FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to select daily_metrics"
  ON daily_metrics FOR SELECT
  USING (auth.role() = 'authenticated');

-- Políticas para permitir inserções anônimas (para rastreamento)
CREATE POLICY "Allow anonymous inserts to page_views"
  ON page_views FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts to click_events"
  ON click_events FOR INSERT
  WITH CHECK (true);

-- Função para agregar dados diariamente (será executada por um job)
CREATE OR REPLACE FUNCTION aggregate_daily_metrics(target_date DATE)
RETURNS VOID AS $$
BEGIN
  -- Inserir ou atualizar métricas diárias
  INSERT INTO daily_metrics (date, page_path, view_count, unique_visitors)
  SELECT
    DATE(created_at) AS date,
    page_path,
    COUNT(*) AS view_count,
    COUNT(DISTINCT session_id) AS unique_visitors
  FROM
    page_views
  WHERE
    DATE(created_at) = target_date
  GROUP BY
    DATE(created_at),
    page_path
  ON CONFLICT (date, page_path)
  DO UPDATE SET
    view_count = EXCLUDED.view_count,
    unique_visitors = EXCLUDED.unique_visitors,
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql;

