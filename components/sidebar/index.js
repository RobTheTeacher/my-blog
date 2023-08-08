import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./sidebar.module.css";
import classNames from "classnames";
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from "next/router";

export default function Navbar() {
  const supabaseClient = useSupabaseClient()
  const user = useUser();
  const router = useRouter();
  
  let pathname = usePathname() || "/";
  if (pathname.includes("/blog/")) {
    pathname = "/blog";
  }

  const navItems = {
    "/": {
      name: "Home",
    },
    "/about": {
      name: "About",
    },
    "/blog": {
      name: "Blog",
    },
    "/create-post": {
      name: "Create post",
      requiresAuth: true
    },
    "/login": {
      name: "Login",
      requiresAuth: false
    },
    "/logout": {
      name: "Logout",
      requiresAuth: true,
      onClick: async () => {
        await supabaseClient.auth.signOut();
        router.push('/');
      }
    }
  };

  return (
    <aside className={styles.container}>
      <div className={styles.sticky}>
        <nav className={styles.navigation} id="nav">
          <div className={styles.navigationItemWrapper}>
            {Object.entries(navItems).map(([path, { name, requiresAuth, onClick }]) => {
              const isActive = path === pathname;
              if ((requiresAuth && !user) || (path === "/login" && user)) {
                return
              }

              if (path === "/logout") {
                return (
                  <button key={path}
                    className={classNames(styles.navigationItem, {
                      [styles.textNeutral]: !isActive,
                      [styles.fontBold]: isActive,
                    })}
                    onClick={onClick}
                  >{name}
                  </button>
                )
              }
              return (
                <Link
                  key={path}
                  href={path}
                  className={classNames(styles.navigationItem, {
                    [styles.textNeutral]: !isActive,
                    [styles.fontBold]: isActive,
                  })}
                >
                  <span className={styles.linkName}>{name}</span>
                </Link>
              );

            })}
          </div>
        </nav>
      </div>
    </aside>
  );
}
