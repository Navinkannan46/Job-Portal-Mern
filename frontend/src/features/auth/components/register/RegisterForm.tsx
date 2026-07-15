import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "@/features/auth/store/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/features/auth/store/authSlice";

export default function RegisterForm() {
  const [role, setRole] = useState<"USER" | "EMPLOYER">("USER");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await register({ name, email, password, role }).unwrap();
      dispatch(setCredentials({ user: response.data.user }));
      navigate("/login");
    } catch (err: any) {
      setError(err?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
      <Card className="relative w-full max-w-lg rounded-lg shadow-xl border bg-white/70 backdrop-blur-xl">
        <CardContent className="py-2 px-6">
          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight">
              Create Account
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              Start your professional journey
            </p>
          </div>

          {/* Role Toggle */}
          <Tabs
            defaultValue="USER"
            className="mb-6"
            onValueChange={(val) => setRole(val as "USER" | "EMPLOYER")}
          >
            <TabsList className="grid grid-cols-2 w-full h-11 rounded-md">
              <TabsTrigger value="USER">USER</TabsTrigger>
              <TabsTrigger value="EMPLOYER">EMPLOYER</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md border border-red-100">
                {error}
              </div>
            )}
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                className="h-11"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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

            {/* Passwords */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <div className="space-y-2 relative">
                <Label htmlFor="confirm">Confirm</Label>
                <Input
                  id="confirm"
                  type={showConfirm ? "text" : "password"}
                  className="h-11 pr-10"
                  value={confirmPassword}
                  placeholder="******"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-[28px] text-muted-foreground"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 text-base font-semibold bg-blue-600 hover:opacity-90 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                `Create as ${role === "USER" ? "Job Seeker" : "Employer"}`
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="text-center mt-6 text-sm text-muted-foreground">
            Already have an account?
            <Link
              to="/login"
              className="text-indigo-600 font-semibold ml-1 hover:underline"
            >
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
