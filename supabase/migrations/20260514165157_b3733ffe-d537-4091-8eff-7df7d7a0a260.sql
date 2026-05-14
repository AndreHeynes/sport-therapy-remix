ALTER FUNCTION public.has_role(uuid, app_role) SECURITY INVOKER;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM anon;