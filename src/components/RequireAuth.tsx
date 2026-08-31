import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import type { User } from "@supabase/supabase-js";

import { supabase } from "@/integrations/supabase/client";

type AuthState =
  { status: "loading" } | { status: "authenticated"; user: User } | { status: "anonymous" };

export type AuthOutletContext = { user: User };

// Client-side replacement for the old `_authenticated` TanStack Router layout
// route's `beforeLoad` guard: check the Supabase session before rendering any
// nested route, and bounce to /auth if there isn't one.
export function RequireAuth() {
  const [state, setState] = useState<AuthState>({ status: "loading" });

  useEffect(() => {
    let active = true;
    supabase.auth.getUser().then(({ data, error }) => {
      if (!active) return;
      if (error || !data.user) {
        setState({ status: "anonymous" });
      } else {
        setState({ status: "authenticated", user: data.user });
      }
    });
    return () => {
      active = false;
    };
  }, []);

  if (state.status === "loading") return null;
  if (state.status === "anonymous") return <Navigate to="/auth" replace />;
  return <Outlet context={{ user: state.user } satisfies AuthOutletContext} />;
}
