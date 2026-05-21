import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { Bell, Gift, MessageSquare, Coins, ChevronDown, User as UserIcon, Settings, CreditCard, Users, Sparkles, LogOut, Crown, Wallet } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const platformNav = [
  { label: "Feed", to: "/feed" },
  { label: "My Page", to: "/profile" },
  { label: "Challenges", to: "/challenges" },
  { label: "Blog", to: "/blog" },
  { label: "Gallery", to: "/gallery" },
  { label: "Upgrade", to: "/pricing", accent: true },
];

const PlatformTopBar = () => {
  const { user, signOut } = useAuth();
  const [credits, setCredits] = useState<number | null>(null);

  useEffect(() => {
    if (!user) { setCredits(null); return; }
    supabase
      .from("credit_balances")
      .select("balance, monthly_credits, bonus_credits")
      .eq("user_id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (!data) { setCredits(0); return; }
        setCredits((data.balance ?? 0) + (data.monthly_credits ?? 0) + (data.bonus_credits ?? 0));
      });
  }, [user]);

  const initials = (user?.email ?? "On").slice(0, 2).toUpperCase();

  return (
    <div className="sticky top-[72px] md:top-20 z-40 border-b border-border/30 bg-background/85 backdrop-blur-xl">
      <div className="container-narrow flex h-12 items-center justify-between gap-4 px-4">
        <nav className="flex items-center gap-1 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {platformNav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end
              className={({ isActive }) =>
                `whitespace-nowrap rounded-md px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.15em] transition-colors ${
                  isActive
                    ? "text-foreground bg-foreground/10"
                    : n.accent
                    ? "text-cyan-300/90 hover:text-cyan-200"
                    : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Link
            to="/pricing"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-md border border-border/50 bg-card/60 px-2.5 py-1 text-[11px] font-medium text-foreground/90 hover:bg-card transition"
            title="Credit balance"
          >
            <Coins className="h-3.5 w-3.5 text-cyan-300/90" />
            <span className="tabular-nums">{credits === null ? "—" : credits.toLocaleString()}</span>
          </Link>
          <Link to="/rewards" title="Daily rewards" className="rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-card/60 transition">
            <Gift className="h-4 w-4" />
          </Link>
          <button title="Notifications · Coming soon" disabled className="relative rounded-md p-2 text-muted-foreground/60 cursor-not-allowed">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400/80" />
          </button>
          <button title="Messages · Coming soon" disabled className="rounded-md p-2 text-muted-foreground/60 cursor-not-allowed">
            <MessageSquare className="h-4 w-4" />
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="ml-1 flex items-center gap-1.5 rounded-full border border-border/50 bg-card/60 pl-1 pr-2 py-1 hover:bg-card transition">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 text-[10px] font-semibold text-foreground/90">
                  {initials}
                </span>
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {user?.email ?? "Guest"}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild><Link to="/profile"><UserIcon className="h-3.5 w-3.5 mr-2" /> My Page</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link to="/coming-soon?title=User+Settings"><Settings className="h-3.5 w-3.5 mr-2" /> User Settings</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link to="/pricing"><Crown className="h-3.5 w-3.5 mr-2" /> Subscription</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link to="/coming-soon?title=Creator+Program"><Sparkles className="h-3.5 w-3.5 mr-2" /> Creator Program</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link to="/coming-soon?title=Refer+to+Earn"><Users className="h-3.5 w-3.5 mr-2" /> Refer to Earn</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link to="/dashboard"><Wallet className="h-3.5 w-3.5 mr-2" /> Credit Balance</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link to="/coming-soon?title=Billing"><CreditCard className="h-3.5 w-3.5 mr-2" /> Billing</Link></DropdownMenuItem>
              <DropdownMenuSeparator />
              {user ? (
                <DropdownMenuItem onClick={signOut}><LogOut className="h-3.5 w-3.5 mr-2" /> Logout</DropdownMenuItem>
              ) : (
                <DropdownMenuItem asChild><Link to="/auth"><LogOut className="h-3.5 w-3.5 mr-2" /> Sign in</Link></DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default PlatformTopBar;
