import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "@/features/auth/store/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/features/auth/store/authSlice";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await login({ email, password }).unwrap();
      dispatch(setCredentials({ user: response.data.user }));

      const role = response.data.user.role;
      const destination =
        role === "ADMIN"
          ? "/admin/dashboard"
          : role === "EMPLOYER"
            ? "/employer/dashboard"
            : "/";

      navigate(destination);
    } catch (err: any) {
      setError(err?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
      <Card className="relative w-full max-w-md rounded-lg shadow-xl border bg-white/70 backdrop-blur-xl">
        <CardContent className="p-8">
          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Welcome Back</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Access your professional dashboard
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md border border-red-100">
                {error}
              </div>
            )}
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@email.com"
                className="h-11"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2 relative">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                className="h-11 pr-10"
                value={password}
                placeholder="******"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[28px] text-muted-foreground"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 text-base font-semibold bg-blue-600 hover:opacity-90 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Log In"
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="text-center mt-6 text-sm text-muted-foreground">
            Don’t have an account?
            <Link to="/register" className="text-blue-500 ml-1 hover:underline">
              Register
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
