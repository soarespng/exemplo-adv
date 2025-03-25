-- Função para obter visualizações por página
CREATE OR REPLACE FUNCTION get_page_views_by_path(start_date TIMESTAMP, end_date TIMESTAMP)
RETURNS TABLE (
  page_path TEXT,
  view_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    pv.page_path,
    COUNT(*) AS view_count
  FROM
    page_views pv
  WHERE
    pv.created_at >= start_date AND
    pv.created_at <= end_date
  GROUP BY
    pv.page_path
  ORDER BY
    view_count DESC;
END;
$$ LANGUAGE plpgsql;

-- Função para obter visualizações diárias
CREATE OR REPLACE FUNCTION get_daily_views(start_date TIMESTAMP, end_date TIMESTAMP)
RETURNS TABLE (
  date TEXT,
  view_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    TO_CHAR(DATE(pv.created_at), 'YYYY-MM-DD') AS date,
    COUNT(*) AS view_count
  FROM
    page_views pv
  WHERE
    pv.created_at >= start_date AND
    pv.created_at <= end_date
  GROUP BY
    DATE(pv.created_at)
  ORDER BY
    DATE(pv.created_at);
END;
$$ LANGUAGE plpgsql;

-- Função para obter eventos por nome
CREATE OR REPLACE FUNCTION get_events_by_name(start_date TIMESTAMP, end_date TIMESTAMP)
RETURNS TABLE (
  event_name TEXT,
  count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    ce.event_name,
    COUNT(*) AS count
  FROM
    click_events ce
  WHERE
    ce.created_at >= start_date AND
    ce.created_at <= end_date
  GROUP BY
    ce.event_name
  ORDER BY
    count DESC;
END;
$$ LANGUAGE plpgsql;

-- Função para obter eventos por página
CREATE OR REPLACE FUNCTION get_events_by_page(start_date TIMESTAMP, end_date TIMESTAMP)
RETURNS TABLE (
  page_path TEXT,
  count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    ce.page_path,
    COUNT(*) AS count
  FROM
    click_events ce
  WHERE
    ce.created_at >= start_date AND
    ce.created_at <= end_date
  GROUP BY
    ce.page_path
  ORDER BY
    count DESC;
END;
$$ LANGUAGE plpgsql;

-- Função para obter os principais referenciadores
CREATE OR REPLACE FUNCTION get_top_referrers(start_date TIMESTAMP, end_date TIMESTAMP, limit_count INTEGER)
RETURNS TABLE (
  referrer TEXT,
  count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COALESCE(pv.referrer, 'Direct') AS referrer,
    COUNT(*) AS count
  FROM
    page_views pv
  WHERE
    pv.created_at >= start_date AND
    pv.created_at <= end_date
  GROUP BY
    COALESCE(pv.referrer, 'Direct')
  ORDER BY
    count DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- Função para obter a distribuição de dispositivos
CREATE OR REPLACE FUNCTION get_device_breakdown(start_date TIMESTAMP, end_date TIMESTAMP)
RETURNS TABLE (
  device_type TEXT,
  count BIGINT,
  percentage NUMERIC
) AS $$
DECLARE
  total BIGINT;
BEGIN
  -- Obter o total de visualizações
  SELECT COUNT(*) INTO total FROM page_views
  WHERE created_at >= start_date AND created_at <= end_date;
  
  RETURN QUERY
  SELECT
    COALESCE(pv.device_type, 'Unknown') AS device_type,
    COUNT(*) AS count,
    ROUND((COUNT(*) * 100.0 / NULLIF(total, 0)), 2) AS percentage
  FROM
    page_views pv
  WHERE
    pv.created_at >= start_date AND
    pv.created_at <= end_date
  GROUP BY
    COALESCE(pv.device_type, 'Unknown')
  ORDER BY
    count DESC;
END;
$$ LANGUAGE plpgsql;

