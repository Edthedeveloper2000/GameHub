import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="mt-12 border-t border-border bg-background py-8">
      <div className="container-page flex items-center gap-3">
        <img
          src={logo}
          alt=""
          loading="lazy"
          width={24}
          height={24}
          style={{ width: 24, height: 24 }}
        />
        <p className="text-[13px] font-medium text-muted-foreground">
          GameHub UFV — Campus Florestal
        </p>
      </div>
    </footer>
  );
}
