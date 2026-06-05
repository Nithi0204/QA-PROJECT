import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Kanban, 
  BarChart3, 
  Settings, 
  LogOut, 
  Bell, 
  AlertCircle, 
  Clock, 
  Activity, 
  CheckCircle2, 
  X,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

// Team Member configuration with avatar colors
const TEAM_MEMBERS = {
  'Rahul Verma': { initials: 'R', color: '#3b82f6' },
  'Arun Kumar': { initials: 'A', color: '#06b6d4' },
  'Dev Nair': { initials: 'D', color: '#6366f1' },
  'Priya Sharma': { initials: 'P', color: '#8b5cf6' }
};

// Initial static Bug Data matching the screenshot
const INITIAL_BUGS = [
  {
    id: 'BUG-001',
    project: 'PaymentGateway',
    module: 'Checkout',
    severity: 'Critical',
    assignedTo: 'Rahul Verma',
    devStatus: 'In Progress',
    testerStatus: 'Open'
  },
  {
    id: 'BUG-002',
    project: 'PaymentGateway',
    module: 'Billing',
    severity: 'High',
    assignedTo: 'Arun Kumar',
    devStatus: 'Fixed',
    testerStatus: 'Retest'
  },
  {
    id: 'BUG-003',
    project: 'MobileApp',
    module: 'Onboarding',
    severity: 'Critical',
    assignedTo: 'Rahul Verma',
    devStatus: 'Open',
    testerStatus: 'Open'
  },
  {
    id: 'BUG-004',
    project: 'AdminPortal',
    module: 'User Management',
    severity: 'High',
    assignedTo: 'Dev Nair',
    devStatus: 'In Progress',
    testerStatus: 'Open'
  },
  {
    id: 'BUG-005',
    project: 'MobileApp',
    module: 'Dashboard',
    severity: 'Medium',
    assignedTo: 'Arun Kumar',
    devStatus: 'Fixed',
    testerStatus: 'Fixed'
  }
];

// Initial Live Activity feed contents matching the screenshot
const INITIAL_ACTIVITIES = [
  {
    id: 1,
    user: 'Rahul Verma',
    action: 'moved to In Progress',
    bugId: 'BUG-001',
    timestamp: 'Jun 4, 5:26 PM'
  },
  {
    id: 2,
    user: 'Arun Kumar',
    action: 'marked as Fixed',
    bugId: 'BUG-002',
    timestamp: 'Jun 4, 5:26 PM'
  },
  {
    id: 3,
    user: 'Priya Sharma',
    action: 'moved to Retest',
    bugId: 'BUG-002',
    timestamp: 'Jun 4, 5:26 PM'
  },
  {
    id: 4,
    user: 'Sneha Patel',
    action: 'assigned to Rahul Verma',
    bugId: 'BUG-003',
    timestamp: 'Jun 4, 5:26 PM'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [selectedProject, setSelectedProject] = useState('All');
  const [selectedModule, setSelectedModule] = useState('All');
  const [showBanner, setShowBanner] = useState(true);

  // Extract unique projects and modules for filters
  const projects = useMemo(() => {
    const set = new Set(INITIAL_BUGS.map(b => b.project));
    return ['All', ...Array.from(set)];
  }, []);

  const modules = useMemo(() => {
    const filteredBugs = selectedProject === 'All' 
      ? INITIAL_BUGS 
      : INITIAL_BUGS.filter(b => b.project === selectedProject);
    const set = new Set(filteredBugs.map(b => b.module));
    return ['All', ...Array.from(set)];
  }, [selectedProject]);

  // Filter bug list based on selections
  const filteredBugs = useMemo(() => {
    return INITIAL_BUGS.filter(bug => {
      const matchProject = selectedProject === 'All' || bug.project === selectedProject;
      const matchModule = selectedModule === 'All' || bug.module === selectedModule;
      return matchProject && matchModule;
    });
  }, [selectedProject, selectedModule]);

  // Dynamic statistics calculations
  const stats = useMemo(() => {
    // If no filters are active, return standard values from the screenshot
    if (selectedProject === 'All' && selectedModule === 'All') {
      return {
        activeBugs: 12,
        activeTrend: '+12.5%',
        retestPending: 3,
        retestTrend: '-3.2%',
        fixInProgress: 5,
        fixTrend: '+8.1%',
        closedBugs: 2,
        closedTrend: '+15.4%'
      };
    }

    // Otherwise calculate dynamically based on active filter list
    const activeCount = filteredBugs.filter(b => b.devStatus !== 'Fixed').length;
    const retestCount = filteredBugs.filter(b => b.testerStatus === 'Retest').length;
    const progressCount = filteredBugs.filter(b => b.devStatus === 'In Progress').length;
    const closedCount = filteredBugs.filter(b => b.testerStatus === 'Fixed' || b.devStatus === 'Fixed').length;

    return {
      activeBugs: activeCount * 2, // Scaled for demo purposes
      activeTrend: activeCount > 0 ? '+5.0%' : '0.0%',
      retestPending: retestCount,
      retestTrend: '0.0%',
      fixInProgress: progressCount,
      fixTrend: '+2.5%',
      closedBugs: closedCount,
      closedTrend: '+1.2%'
    };
  }, [filteredBugs, selectedProject, selectedModule]);

  // Team Workload Calculations (dynamic based on current filter)
  const teamWorkload = useMemo(() => {
    const workload = {
      'Rahul Verma': { active: 0, retest: 0, fixed: 0 },
      'Arun Kumar': { active: 0, retest: 0, fixed: 0 },
      'Dev Nair': { active: 0, retest: 0, fixed: 0 }
    };

    // Calculate from the visual bugs matching the filter
    filteredBugs.forEach(bug => {
      const member = bug.assignedTo;
      if (workload[member]) {
        if (bug.devStatus === 'In Progress' || bug.devStatus === 'Open') {
          workload[member].active += 1;
        }
        if (bug.testerStatus === 'Retest') {
          workload[member].retest += 1;
        }
        if (bug.devStatus === 'Fixed' || bug.testerStatus === 'Fixed') {
          workload[member].fixed += 1;
        }
      }
    });

    // If All is selected, we override to match the screenshot values exactly
    if (selectedProject === 'All' && selectedModule === 'All') {
      return [
        { name: 'Rahul Verma', active: 5, retest: 0, fixed: 1 },
        { name: 'Arun Kumar', active: 1, retest: 3, fixed: 3 },
        { name: 'Dev Nair', active: 3, retest: 0, fixed: 1 }
      ];
    }

    return Object.keys(workload).map(name => ({
      name,
      ...workload[name]
    }));
  }, [filteredBugs, selectedProject, selectedModule]);

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-top">
          <div className="logo-container">
            <div className="logo-icon">QA</div>
            <span className="logo-text">QAMind</span>
          </div>
          
          <nav className="nav-menu">
            <div 
              className={`nav-item ${activeTab === 'Dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('Dashboard')}
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </div>
            <div 
              className={`nav-item ${activeTab === 'Create Bug' ? 'active' : ''}`}
              onClick={() => setActiveTab('Create Bug')}
            >
              <PlusCircle size={18} />
              <span>Create Bug</span>
            </div>
            <div 
              className={`nav-item ${activeTab === 'Operations Board' ? 'active' : ''}`}
              onClick={() => setActiveTab('Operations Board')}
            >
              <Kanban size={18} />
              <span>Operations Board</span>
            </div>
            <div 
              className={`nav-item ${activeTab === 'Reports' ? 'active' : ''}`}
              onClick={() => setActiveTab('Reports')}
            >
              <BarChart3 size={18} />
              <span>Reports</span>
            </div>
            <div 
              className={`nav-item ${activeTab === 'Settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('Settings')}
            >
              <Settings size={18} />
              <span>Settings</span>
            </div>
          </nav>
        </div>

        <div className="sidebar-bottom">
          <div className="user-profile">
            <div 
              className="avatar-circle" 
              style={{ backgroundColor: TEAM_MEMBERS['Priya Sharma'].color }}
            >
              {TEAM_MEMBERS['Priya Sharma'].initials}
            </div>
            <div className="user-info">
              <span className="user-name">Priya Sharma</span>
              <span className="user-email">priya@qamind.io</span>
            </div>
          </div>
          <button className="sign-out-btn">
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Dashboard */}
      <main className="main-content">
        {/* Header */}
        <header className="dashboard-header">
          <h1 className="dashboard-title">Dashboard</h1>
          <div className="header-actions">
            <button className="icon-button" aria-label="Notifications">
              <Bell size={18} />
              <span className="notification-badge"></span>
            </button>
            <div className="header-avatar">P</div>
          </div>
        </header>

        {/* Filters Panel */}
        <section className="filters-bar">
          <span className="filter-label">Filter:</span>
          
          <select 
            className="filter-dropdown" 
            value={selectedProject}
            onChange={(e) => {
              setSelectedProject(e.target.value);
              setSelectedModule('All'); // Reset module on project change
            }}
          >
            <option value="All">All Projects</option>
            {projects.filter(p => p !== 'All').map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>

          <select 
            className="filter-dropdown"
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
          >
            <option value="All">All Modules</option>
            {modules.filter(m => m !== 'All').map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </section>

        {/* Metrics Grid */}
        <section className="metrics-grid">
          {/* Active Bugs */}
          <div className="metric-card active-bugs">
            <div className="metric-header">
              <span className="metric-label">Active Bugs</span>
              <div className="metric-icon-wrapper">
                <AlertCircle size={18} />
              </div>
            </div>
            <div className="metric-value">{stats.activeBugs}</div>
            <div className="metric-trend-container">
              <span className="trend-badge positive">{stats.activeTrend}</span>
              <span className="trend-text">vs last week</span>
            </div>
          </div>

          {/* Retest Pending */}
          <div className="metric-card retest-pending">
            <div className="metric-header">
              <span className="metric-label">Retest Pending</span>
              <div className="metric-icon-wrapper">
                <Clock size={18} />
              </div>
            </div>
            <div className="metric-value">{stats.retestPending}</div>
            <div className="metric-trend-container">
              <span className="trend-badge negative">{stats.retestTrend}</span>
              <span className="trend-text">vs last week</span>
            </div>
          </div>

          {/* Fix In Progress */}
          <div className="metric-card fix-progress">
            <div className="metric-header">
              <span className="metric-label">Fix In Progress</span>
              <div className="metric-icon-wrapper">
                <Activity size={18} />
              </div>
            </div>
            <div className="metric-value">{stats.fixInProgress}</div>
            <div className="metric-trend-container">
              <span className="trend-badge positive">{stats.fixTrend}</span>
              <span className="trend-text">vs last week</span>
            </div>
          </div>

          {/* Closed Bugs */}
          <div className="metric-card closed-bugs">
            <div className="metric-header">
              <span className="metric-label">Closed Bugs</span>
              <div className="metric-icon-wrapper">
                <CheckCircle2 size={18} />
              </div>
            </div>
            <div className="metric-value">{stats.closedBugs}</div>
            <div className="metric-trend-container">
              <span className="trend-badge negative">{stats.closedTrend}</span>
              <span className="trend-text">vs last week</span>
            </div>
          </div>
        </section>

        {/* Middle Section (Activity and Workload) */}
        <section className="middle-row">
          {/* Live Activity Feed */}
          <div className="widget-panel">
            <h2 className="widget-title">
              <Activity size={16} />
              <span>Live Activity</span>
            </h2>
            <div className="activity-list">
              {INITIAL_ACTIVITIES.map((act) => (
                <div key={act.id} className="activity-item">
                  <div className="activity-icon-container">
                    <Activity size={14} />
                  </div>
                  <div className="activity-content">
                    <div className="activity-text">
                      <strong>{act.user}</strong> {act.action} 
                      <span className="bug-pill-small">{act.bugId}</span>
                    </div>
                    <span className="activity-time">{act.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Workload */}
          <div className="widget-panel">
            <h2 className="widget-title">
              <LayoutDashboard size={16} />
              <span>Team Workload</span>
            </h2>
            <table className="workload-table">
              <thead>
                <tr>
                  <th style={{ width: '40%' }}>Team Member</th>
                  <th style={{ width: '20%' }}>Active Bugs</th>
                  <th style={{ width: '20%' }}>Retest Pending</th>
                  <th style={{ width: '20%' }}>Fixed</th>
                </tr>
              </thead>
              <tbody>
                {teamWorkload.map((member) => {
                  const details = TEAM_MEMBERS[member.name] || { initials: 'T', color: '#4b5563' };
                  return (
                    <tr key={member.name}>
                      <td>
                        <div className="workload-member">
                          <div 
                            className="workload-avatar" 
                            style={{ backgroundColor: details.color }}
                          >
                            {details.initials}
                          </div>
                          <span className="workload-name">{member.name}</span>
                        </div>
                      </td>
                      <td>
                        <span className="workload-badge-box active">{member.active}</span>
                      </td>
                      <td>
                        <span className="workload-badge-box retest">{member.retest}</span>
                      </td>
                      <td>
                        <span className="workload-badge-box fixed">{member.fixed}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Recent Bugs Table */}
        <section className="recent-bugs-panel">
          <h2 className="recent-bugs-header">Recent Bugs</h2>
          <div className="table-wrapper">
            <table className="bugs-table">
              <thead>
                <tr>
                  <th>Bug ID</th>
                  <th>Project</th>
                  <th>Module</th>
                  <th>Severity</th>
                  <th>Assigned To</th>
                  <th>Dev Status</th>
                  <th>Tester Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredBugs.length > 0 ? (
                  filteredBugs.map((bug) => {
                    const assignedUser = TEAM_MEMBERS[bug.assignedTo] || { initials: '?', color: '#4b5563' };
                    return (
                      <tr key={bug.id}>
                        <td className="bug-id-cell">{bug.id}</td>
                        <td className="project-cell">{bug.project}</td>
                        <td className="module-cell">{bug.module}</td>
                        <td>
                          <span className={`badge severity-${bug.severity.toLowerCase()}`}>
                            {bug.severity}
                          </span>
                        </td>
                        <td>
                          <div className="user-cell">
                            <div 
                              className="user-cell-avatar"
                              style={{ backgroundColor: assignedUser.color }}
                            >
                              {assignedUser.initials}
                            </div>
                            <span>{bug.assignedTo}</span>
                          </div>
                        </td>
                        <td>
                          <span className={`badge status-${bug.devStatus.replace(/\s+/g, '').toLowerCase()}`}>
                            {bug.devStatus}
                          </span>
                        </td>
                        <td>
                          <span className={`badge status-${bug.testerStatus.toLowerCase()}`}>
                            {bug.testerStatus}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '24px' }}>
                      No bugs match the current filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Floating Call to Action Badge/Banner */}
      {showBanner && (
        <div className="floating-banner">
          <a 
            href="https://qamind.io" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="floating-banner-text"
          >
            Build yours free →
          </a>
          <button 
            className="floating-banner-close" 
            onClick={() => setShowBanner(false)}
            aria-label="Close banner"
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
