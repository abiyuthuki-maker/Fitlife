
import React, { useMemo, useState } from "react";
import {
  ShieldCheck,
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Grid2X2,
  ChartNoAxesColumn,
  Settings,
  LogOut,
  Search,
  Bell,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  ArrowUpRight,
  TrendingUp,
  DollarSign,
  UserRound,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const navigation = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Users", icon: Users },
  { label: "Products", icon: Package },
  { label: "Orders", icon: ShoppingCart },
  { label: "Categories", icon: Grid2X2 },
  { label: "Reports", icon: ChartNoAxesColumn },
  { label: "Settings", icon: Settings },
];

const users = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "User", status: "Active", date: "Apr 21, 2026" },
  { id: 2, name: "Sarah Wilson", email: "sarah@example.com", role: "User", status: "Active", date: "Apr 20, 2026" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "Seller", status: "Pending", date: "Apr 19, 2026" },
  { id: 4, name: "Emily Davis", email: "emily@example.com", role: "User", status: "Active", date: "Apr 18, 2026" },
  { id: 5, name: "Robert Brown", email: "robert@example.com", role: "Admin", status: "Active", date: "Apr 17, 2026" },
];

const sales = [10, 14, 18, 14, 20, 18, 26, 34];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];

const products = [
  { name: "Protein Meal", count: 172, color: "#4777ff" },
  { name: "Fitness Gear", count: 124, color: "#36c68b" },
  { name: "Healthy Food", count: 92, color: "#ffa940" },
  { name: "Yoga Mat", count: 78, color: "#9960f5" },
  { name: "Water Bottle", count: 58, color: "#ef5591" },
];

function SalesChart() {
  const points = sales
    .map((value, index) => `${48 + index * 74},${188 - value * 4.4}`)
    .join(" ");

  const area = `48,188 ${points} 566,188`;

  return (
    <svg
      className="sales-chart"
      viewBox="0 0 600 235"
      role="img"
      aria-label="Illustrative sales chart from January to August"
    >
      {[20, 60, 100, 140, 180].map((y, i) => (
        <g key={y}>
          <line x1="48" y1={y} x2="570" y2={y} className="chart-grid" />
          <text x="37" y={y + 4} textAnchor="end" className="chart-label">
            {40 - i * 10}K
          </text>
        </g>
      ))}
      <polygon points={area} className="sales-area" />
      <polyline points={points} className="sales-line" />
      {sales.map((value, index) => (
        <circle
          key={index}
          cx={48 + index * 74}
          cy={188 - value * 4.4}
          r="4.5"
          className="sales-point"
        />
      ))}
      {months.map((month, index) => (
        <text
          key={month}
          x={48 + index * 74}
          y="215"
          textAnchor="middle"
          className="chart-label"
        >
          {month}
        </text>
      ))}
    </svg>
  );
}

function ProductChart() {
  return (
    <div className="product-chart">
      <div className="product-chart-y">
        {[200, 150, 100, 50, 0].map((number) => (
          <span key={number}>{number}</span>
        ))}
      </div>
      <div className="product-chart-content">
        {[200, 150, 100, 50, 0].map((number) => (
          <div className="product-chart-grid" key={number} />
        ))}
        <div className="product-bars">
          {products.map((product) => (
            <div className="product-bar-item" key={product.name}>
              <div className="product-bar-track">
                <div
                  className="product-bar"
                  style={{
                    height: `${(product.count / 200) * 100}%`,
                    background: product.color,
                  }}
                />
              </div>
              <span>{product.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("Dashboard");
  const [search, setSearch] = useState("");
  const [period, setPeriod] = useState("Last 8 Months");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredUsers = useMemo(
    () =>
      users.filter((user) =>
        `${user.name} ${user.email} ${user.role} ${user.status}`
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [search]
  );

  const metrics = [
    {
      title: "Total Users",
      value: "2,458",
      growth: "12%",
      icon: Users,
      className: "blue",
    },
    {
      title: "Total Products",
      value: "1,248",
      growth: "8%",
      icon: Package,
      className: "green",
    },
    {
      title: "Total Orders",
      value: "684",
      growth: "15%",
      icon: ShoppingCart,
      className: "pink",
    },
    {
      title: "Total Revenue",
      value: "LKR 32,560",
      growth: "18%",
      icon: DollarSign,
      className: "purple",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("fitlife-token");
    localStorage.removeItem("fitlife-user");
    navigate("/login");
  };

  return (
    <div className="admin-app">
      {sidebarOpen && (
        <button
          className="admin-mobile-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        />
      )}

      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="admin-logo">
          <div className="admin-logo-icon">
            <ShieldCheck size={24} />
          </div>
          <span>Admin<span className="logo-light">Panel</span></span>
          <button
            className="admin-close-sidebar"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={21} />
          </button>
        </div>

        <div className="admin-nav">
          {navigation.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className={`admin-nav-link ${activePage === label ? "selected" : ""}`}
              onClick={() => {
                setActivePage(label);
                setSidebarOpen(false);
              }}
            >
              <Icon size={20} />
              <span>{label}</span>
              {activePage === label && <span className="nav-indicator" />}
            </button>
          ))}
        </div>

        <button className="admin-logout" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <button
            className="admin-mobile-menu"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu size={23} />
          </button>

          <div className="admin-search-box">
            <Search size={19} />
            <input
              type="search"
              placeholder="Search users, emails..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search users"
            />
            {search && (
              <button
                className="admin-clear-search"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="admin-header-right">
            <button className="admin-notification" aria-label="Notifications">
              <Bell size={21} />
              <span>3</span>
            </button>
            <div className="admin-profile">
              <div className="admin-profile-avatar">
                <UserRound size={22} />
              </div>
              <span>Admin</span>
              <ChevronDown size={16} />
            </div>
          </div>
        </header>

        <div className="admin-page-content">
          <div className="admin-page-heading">
            <div>
              <h1>{activePage}</h1>
              <p>
                Welcome back, Admin! Here&apos;s what&apos;s happening with
                your FITLIFE platform today.
              </p>
            </div>
            {activePage !== "Dashboard" && (
              <button
                className="admin-primary-button"
                onClick={() => window.alert(`${activePage}: Connect your data to enable this action.`)}
              >
                <Plus size={17} />
                Add {activePage === "Users" ? "User" : activePage.slice(0, -1)}
              </button>
            )}
          </div>

          {activePage === "Dashboard" ? (
            <>
              <section className="admin-metric-grid">
                {metrics.map(({ title, value, growth, icon: Icon, className }) => (
                  <article className={`admin-metric-card ${className}`} key={title}>
                    <div className="admin-metric-icon">
                      <Icon size={25} />
                    </div>
                    <div className="admin-metric-info">
                      <p>{title}</p>
                      <h2>{value}</h2>
                      <div className="admin-growth">
                        <TrendingUp size={16} />
                        <strong>{growth}</strong>
                        <span>vs. last month</span>
                      </div>
                    </div>
                    <ArrowUpRight className="admin-metric-arrow" size={18} />
                  </article>
                ))}
              </section>

              <section className="admin-charts-grid">
                <article className="admin-card">
                  <div className="admin-card-heading">
                    <h3>Sales Overview</h3>
                    <select
                      value={period}
                      onChange={(event) => setPeriod(event.target.value)}
                      aria-label="Sales chart period"
                    >
                      <option>Last 8 Months</option>
                      <option>Last 7 Months</option>
                      <option>Last 30 Days</option>
                    </select>
                  </div>
                  <SalesChart />
                  <p className="admin-chart-note">
                    Illustrative sample data · {period}
                  </p>
                </article>

                <article className="admin-card">
                  <div className="admin-card-heading">
                    <h3>Top Products</h3>
                    <button
                      className="admin-more-button"
                      onClick={() => setActivePage("Products")}
                    >
                      View all <ChevronRight size={16} />
                    </button>
                  </div>
                  <ProductChart />
                </article>
              </section>

              <section className="admin-card admin-users-card">
                <div className="admin-card-heading">
                  <div>
                    <h3>Recent Users</h3>
                    <p className="admin-subheading">
                      Latest registered users · sample data
                    </p>
                  </div>
                  <button
                    className="admin-view-all"
                    onClick={() => setActivePage("Users")}
                  >
                    View All <ChevronRight size={16} />
                  </button>
                </div>

                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Joined On</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.id}>
                          <td>{user.id}</td>
                          <td>
                            <div className="admin-user-name">
                              <div className="admin-user-avatar">
                                {user.name.charAt(0)}
                              </div>
                              {user.name}
                            </div>
                          </td>
                          <td>{user.email}</td>
                          <td>{user.role}</td>
                          <td>
                            <span className={`admin-status ${user.status.toLowerCase()}`}>
                              {user.status}
                            </span>
                          </td>
                          <td>{user.date}</td>
                        </tr>
                      ))}
                      {filteredUsers.length === 0 && (
                        <tr>
                          <td colSpan="6" className="admin-no-results">
                            No users found for &quot;{search}&quot;.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          ) : (
            <section className="admin-card admin-section-placeholder">
              <div className="admin-placeholder-icon">
                {activePage === "Users" && <Users size={32} />}
                {activePage === "Products" && <Package size={32} />}
                {activePage === "Orders" && <ShoppingCart size={32} />}
                {activePage === "Categories" && <Grid2X2 size={32} />}
                {activePage === "Reports" && <ChartNoAxesColumn size={32} />}
                {activePage === "Settings" && <Settings size={32} />}
              </div>
              <h2>{activePage} Management</h2>
              <p>
                This is a frontend-only preview. Connect a backend later to
                load and manage real FITLIFE {activePage.toLowerCase()}.
              </p>
              <button
                className="admin-primary-button"
                onClick={() => setActivePage("Dashboard")}
              >
                Back to Dashboard
              </button>
            </section>
          )}

          <footer className="admin-footer">
            <span>© 2026 FITLIFE Admin Panel</span>
            <span>Admin Dashboard · Frontend Preview</span>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
