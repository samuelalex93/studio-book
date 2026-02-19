// import { Button } from "../components/Button";
// import { Input } from "../components/Input";

export function Login() {
  return (
    <div className="min-h-screen flex flex-col justify-center p-6 gap-4">
      <h1 className="text-3xl font-bold text-brand-secondary text-center">
        Barber Shop
      </h1>

      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Senha" />

      <button>Entrar</button>

      <p className="text-center text-sm text-brand-muted">
        Não tem conta? <span className="text-brand-deep font-semibold">Cadastrar</span>
      </p>
    </div>
  );
}
