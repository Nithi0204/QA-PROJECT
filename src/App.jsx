import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Kanban, 
  BarChart3, 
  Settings as SettingsIcon, 
  LogOut, 
  Bell, 
  AlertCircle, 
  Clock, 
  Activity, 
  CheckCircle2, 
  X,
  Search,
  Filter,
  User,
  Shield,
  Sliders,
  Calendar,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Briefcase,
  AlertOctagon,
  Users,
  ChevronRight,
  RefreshCw,
  Terminal,
  MoreVertical,
  ArrowRight,
  CheckSquare,
  Folder,
  TrendingUp,
  FileText
} from 'lucide-react';

// Team Member configuration with avatars and colors
const TEAM_MEMBERS = {
  'Priya Sharma': { initials: 'P', color: '#a78bfa', email: 'priya@qamind.io', role: 'QA Lead', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
  'Rahul Verma': { initials: 'R', color: '#60a5fa', email: 'rahul@qamind.io', role: 'Senior Developer' },
  'Arun Kumar': { initials: 'A', color: '#22d3ee', email: 'arun@qamind.io', role: 'Full Stack Dev' },
  'Dev Nair': { initials: 'D', color: '#818cf8', email: 'dev@qamind.io', role: 'Backend Dev' },
  'Sneha Patel': { initials: 'S', color: '#34d399', email: 'sneha@qamind.io', role: 'QA Engineer' }
};

// Enriched mock bugs database to make developer workload lists populated and realistic
const INITIAL_BUGS = [
  {
    id: 'BUG-125',
    project: 'Payment Gateway',
    module: 'Checkout',
    subModule: 'UPI Payment',
    description: 'UPI transactions failing on Android devices during high network latency peaks. Returns null transaction ID from vendor API.',
    priority: 'P1',
    severity: 'Critical',
    assignedTo: 'Rahul Verma',
    assignedBy: 'Priya Sharma',
    assignedDate: 'Jun 3, 2026',
    devStatus: 'In Progress',
    testerStatus: 'Open',
    updatedTime: '10 min ago',
    comments: [
      { author: 'Priya Sharma', text: 'Reproduced on real device testing. Occurs 3 out of 10 times.', date: 'Jun 3, 2026' }
    ]
  },
  {
    id: 'BUG-124',
    project: 'Payment Gateway',
    module: 'Billing',
    subModule: 'Credit Card',
    description: 'Subscription billing system charging customers 24 hours prior to actual cycle end date.',
    priority: 'P2',
    severity: 'High',
    assignedTo: 'Arun Kumar',
    assignedBy: 'Priya Sharma',
    assignedDate: 'Jun 4, 2026',
    devStatus: 'Fixed',
    testerStatus: 'Retest',
    updatedTime: '1 hr ago',
    comments: [
      { author: 'Arun Kumar', text: 'Fixed the timezone offset checking in billing cron job.', date: 'Jun 4, 2026' }
    ]
  },
  {
    id: 'BUG-123',
    project: 'Mobile App',
    module: 'Onboarding',
    subModule: 'SMS Verification',
    description: 'Resend OTP button remains disabled after the 65-second cooldown timer expires.',
    priority: 'P3',
    severity: 'Medium',
    assignedTo: 'Rahul Verma',
    assignedBy: 'Sneha Patel',
    assignedDate: 'Jun 4, 2026',
    devStatus: 'Open',
    testerStatus: 'Retest',
    updatedTime: '2 hr ago',
    comments: []
  },
  {
    id: 'BUG-122',
    project: 'Web Portal',
    module: 'Dashboard',
    subModule: 'Analytics Charts',
    description: 'Line graph renders with overlapping X-axis labels when device orientation changes to landscape.',
    priority: 'P4',
    severity: 'Low',
    assignedTo: 'Priya Sharma',
    assignedBy: 'Sneha Patel',
    assignedDate: 'Jun 5, 2026',
    devStatus: 'In Progress',
    testerStatus: 'Closed',
    fixedDate: 'Jun 5, 2026',
    updatedTime: '3 hr ago',
    comments: [
      { author: 'Priya Sharma', text: 'Implementing dynamic layout width resize checking.', date: 'Jun 5, 2026' }
    ]
  },
  {
    id: 'BUG-121',
    project: 'Mobile App',
    module: 'Profile',
    subModule: 'Account Settings',
    description: 'User avatar upload fails when image dimensions exceed 1000px width/height, despite size being under 1MB.',
    priority: 'P2',
    severity: 'High',
    assignedTo: 'Arun Kumar',
    assignedBy: 'Priya Sharma',
    assignedDate: 'Jun 5, 2026',
    devStatus: 'Open',
    testerStatus: 'Open',
    updatedTime: '4 hr ago',
    comments: []
  },
  {
    id: 'BUG-120',
    project: 'Payment Gateway',
    module: 'Checkout',
    subModule: 'Credit Card',
    description: 'Checkout page crashes on iOS Safari when card verification fails three consecutive times.',
    priority: 'P1',
    severity: 'Critical',
    assignedTo: 'Rahul Verma',
    assignedBy: 'Priya Sharma',
    assignedDate: 'May 28, 2026',
    devStatus: 'Fixed',
    testerStatus: 'Closed',
    fixedDate: 'Jun 1, 2026',
    updatedTime: '5 hr ago',
    comments: []
  },
  {
    id: 'BUG-119',
    project: 'Mobile App',
    module: 'Profile',
    subModule: 'Account Settings',
    description: 'Dark mode settings toggle resets to default light mode upon terminating the app memory container.',
    priority: 'P3',
    severity: 'Medium',
    assignedTo: 'Rahul Verma',
    assignedBy: 'Sneha Patel',
    assignedDate: 'May 30, 2026',
    devStatus: 'In Progress',
    testerStatus: 'Open',
    updatedTime: '6 hr ago',
    comments: []
  },
  {
    id: 'BUG-118',
    project: 'Web Portal',
    module: 'Dashboard',
    subModule: 'Analytics Charts',
    description: 'Data fetch timeout occurs when query range exceeds 30 days on active billing reports panel.',
    priority: 'P2',
    severity: 'High',
    assignedTo: 'Rahul Verma',
    assignedBy: 'Priya Sharma',
    assignedDate: 'Jun 1, 2026',
    devStatus: 'Fixed',
    testerStatus: 'Closed',
    fixedDate: 'Jun 4, 2026',
    updatedTime: '1 day ago',
    comments: []
  },
  {
    id: 'BUG-117',
    project: 'Mobile App',
    module: 'Onboarding',
    subModule: 'SMS Verification',
    description: 'OTP autofill fails to capture SMS tokens on Android devices running API level 33.',
    priority: 'P2',
    severity: 'High',
    assignedTo: 'Arun Kumar',
    assignedBy: 'Priya Sharma',
    assignedDate: 'Jun 2, 2026',
    devStatus: 'Fixed',
    testerStatus: 'Retest',
    updatedTime: '1 day ago',
    comments: []
  },
  {
    id: 'BUG-116',
    project: 'Payment Gateway',
    module: 'Billing',
    subModule: 'Subscription Billing',
    description: 'Invoice PDFs fail to generate, throwing background rendering syntax errors.',
    priority: 'P2',
    severity: 'High',
    assignedTo: 'Arun Kumar',
    assignedBy: 'Sneha Patel',
    assignedDate: 'Jun 3, 2026',
    devStatus: 'Open',
    testerStatus: 'Open',
    updatedTime: '2 days ago',
    comments: []
  },
  {
    id: 'BUG-115',
    project: 'Web Portal',
    module: 'Dashboard',
    subModule: 'Analytics Charts',
    description: 'Hover tooltips on analytics maps display incorrect geographical coordinates in light mode.',
    priority: 'P4',
    severity: 'Low',
    assignedTo: 'Arun Kumar',
    assignedBy: 'Priya Sharma',
    assignedDate: 'Jun 4, 2026',
    devStatus: 'Fixed',
    testerStatus: 'Closed',
    fixedDate: 'Jun 5, 2026',
    updatedTime: '2 days ago',
    comments: []
  },
  {
    id: 'BUG-114',
    project: 'Web Portal',
    module: 'Dashboard',
    subModule: 'Analytics Charts',
    description: 'Real-time active users counter locks up during WebSocket disconnect retry loops.',
    priority: 'P1',
    severity: 'Critical',
    assignedTo: 'Dev Nair',
    assignedBy: 'Priya Sharma',
    assignedDate: 'Jun 4, 2026',
    devStatus: 'Open',
    testerStatus: 'Open',
    updatedTime: '3 days ago',
    comments: []
  },
  {
    id: 'BUG-113',
    project: 'Analytics Engine',
    module: 'Query Parser',
    subModule: 'SQL Optimizer',
    description: 'Database joins on nested queries take longer than 3.5 seconds, stalling background threads.',
    priority: 'P2',
    severity: 'High',
    assignedTo: 'Dev Nair',
    assignedBy: 'Sneha Patel',
    assignedDate: 'Jun 4, 2026',
    devStatus: 'In Progress',
    testerStatus: 'Open',
    updatedTime: '3 days ago',
    comments: []
  },
  {
    id: 'BUG-112',
    project: 'Payment Gateway',
    module: 'Billing',
    subModule: 'Subscription Billing',
    description: 'Webhook verification returns 401 signature mismatches for Stripe callbacks in test environments.',
    priority: 'P1',
    severity: 'Critical',
    assignedTo: 'Dev Nair',
    assignedBy: 'Priya Sharma',
    assignedDate: 'Jun 2, 2026',
    devStatus: 'Fixed',
    testerStatus: 'Closed',
    fixedDate: 'Jun 4, 2026',
    updatedTime: '4 days ago',
    comments: []
  },
  {
    id: 'BUG-111',
    project: 'Mobile App',
    module: 'Onboarding',
    subModule: 'SMS Verification',
    description: 'Country code select dropdown displays empty results when locale is set to US.',
    priority: 'P3',
    severity: 'Medium',
    assignedTo: 'Priya Sharma',
    assignedBy: 'Sneha Patel',
    assignedDate: 'Jun 3, 2026',
    devStatus: 'Open',
    testerStatus: 'Open',
    updatedTime: '4 days ago',
    comments: []
  },
  {
    id: 'BUG-110',
    project: 'Payment Gateway',
    module: 'Checkout',
    subModule: 'UPI Payment',
    description: 'Auto-retry checkout attempts lock user balances during merchant response delays.',
    priority: 'P1',
    severity: 'Critical',
    assignedTo: 'Priya Sharma',
    assignedBy: 'Priya Sharma',
    assignedDate: 'May 29, 2026',
    devStatus: 'Fixed',
    testerStatus: 'Closed',
    fixedDate: 'Jun 2, 2026',
    updatedTime: '6 days ago',
    comments: []
  }
];

const INITIAL_ACTIVITIES = [
  {
    id: 1,
    user: 'Rahul Verma',
    action: 'moved to In Progress',
    bugId: 'BUG-125',
    timestamp: '10 min ago',
    status: 'In Progress',
    avatarType: 'bug'
  },
  {
    id: 2,
    user: 'Arun Kumar',
    action: 'marked as Fixed',
    bugId: 'BUG-124',
    timestamp: '25 min ago',
    status: 'Fixed',
    avatarType: 'user'
  },
  {
    id: 3,
    user: 'Priya Sharma',
    action: 'retest failed in billing module',
    bugId: 'BUG-123',
    timestamp: '1 hr ago',
    status: 'Retest',
    avatarType: 'sync'
  },
  {
    id: 4,
    user: 'Sneha Patel',
    action: 'marked bug as closed',
    bugId: 'BUG-122',
    timestamp: '2 hr ago',
    status: 'Closed',
    avatarType: 'check'
  },
  {
    id: 5,
    user: 'Priya Sharma',
    action: 'assigned new bug to Rahul Verma',
    bugId: 'BUG-121',
    timestamp: '3 hr ago',
    status: 'Open',
    avatarType: 'user-orange'
  }
];

const PROJECT_MODULES = {
  'Payment Gateway': ['Checkout', 'Billing'],
  'Mobile App': ['Onboarding', 'Profile'],
  'Web Portal': ['Dashboard'],
  'Analytics Engine': ['Query Parser']
};

const MODULE_SUBMODULES = {
  'Checkout': ['UPI Payment', 'Credit Card'],
  'Billing': ['Subscription Billing'],
  'Onboarding': ['SMS Verification'],
  'Profile': ['Account Settings'],
  'Dashboard': ['Analytics Charts'],
  'Query Parser': ['SQL Optimizer']
};

export default function App() {
  // App Session State
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [bugs, setBugs] = useState(INITIAL_BUGS);
  const [activities, setActivities] = useState(INITIAL_ACTIVITIES);

  // Filters State
  const [selectedProject, setSelectedProject] = useState('All');
  const [selectedModule, setSelectedModule] = useState('All');
  const [selectedSubModule, setSelectedSubModule] = useState('All');

  // Operations Board Local UI States
  const [boardSearch, setBoardSearch] = useState('');
  const [boardPriorityFilter, setBoardPriorityFilter] = useState('All');
  const [boardSeverityFilter, setBoardSeverityFilter] = useState('All');
  const [expandedBugId, setExpandedBugId] = useState(null);
  const [updateBugId, setUpdateBugId] = useState(null);
  const [editDevStatus, setEditDevStatus] = useState('Open');
  const [editComment, setEditComment] = useState('');

  // Team Workload Interactive Details Modal States (for Developers View)
  const [selectedWorkloadMember, setSelectedWorkloadMember] = useState(null);
  const [workloadFilterTab, setWorkloadFilterTab] = useState('All');

  // UI States
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [successToast, setSuccessToast] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Create Bug Form State
  const [formProject, setFormProject] = useState('Payment Gateway');
  const [formModule, setFormModule] = useState('Checkout');
  const [formSubModule, setFormSubModule] = useState('UPI Payment');
  const [formDescription, setFormDescription] = useState('');
  const [formPriority, setFormPriority] = useState('P2');
  const [formSeverity, setFormSeverity] = useState('High');
  const [formAssignedTo, setFormAssignedTo] = useState('Rahul Verma');

  // Reset module when Project changes in Filters
  const handleProjectFilterChange = (project) => {
    setSelectedProject(project);
    setSelectedModule('All');
    setSelectedSubModule('All');
  };

  // Reset Submodule when Module changes in Filters
  const handleModuleFilterChange = (module) => {
    setSelectedModule(module);
    setSelectedSubModule('All');
  };

  // Filtered bugs matching dashboard selections
  const dashboardFilteredBugs = useMemo(() => {
    return bugs.filter(bug => {
      const matchProj = selectedProject === 'All' || bug.project === selectedProject;
      const matchMod = selectedModule === 'All' || bug.module === selectedModule;
      const matchSub = selectedSubModule === 'All' || bug.subModule === selectedSubModule;
      return matchProj && matchMod && matchSub;
    });
  }, [bugs, selectedProject, selectedModule, selectedSubModule]);

  // Dynamic Metrics derived from current database count
  const metrics = useMemo(() => {
    const activeBugsCount = bugs.filter(b => b.testerStatus !== 'Closed').length;
    const retestBugsCount = bugs.filter(b => b.testerStatus === 'Retest').length;
    const toFixCount = bugs.filter(b => b.devStatus === 'Open' || b.devStatus === 'In Progress').length;
    const closedCount = bugs.filter(b => b.testerStatus === 'Closed').length;

    return {
      active: activeBugsCount,
      retest: retestBugsCount,
      toFix: toFixCount,
      closed: closedCount
    };
  }, [bugs]);

  // Team Workload derived list using baseline offsets
  const workloadData = useMemo(() => {
    const devs = ['Rahul Verma', 'Arun Kumar', 'Dev Nair', 'Priya Sharma'];
    
    const BASELINES = {
      'Rahul Verma': { active: 12, toFix: 6, fixed: 2, retest: 3, closed: 18 },
      'Arun Kumar': { active: 9, toFix: 5, fixed: 1, retest: 2, closed: 14 },
      'Dev Nair': { active: 7, toFix: 4, fixed: 1, retest: 1, closed: 11 },
      'Priya Sharma': { active: 5, toFix: 2, fixed: 1, retest: 4, closed: 9 }
    };

    return devs.map(name => {
      const base = BASELINES[name];

      const currentBugs = bugs.filter(b => b.assignedTo === name);
      const currentActive = currentBugs.filter(b => b.devStatus !== 'Fixed' && b.testerStatus !== 'Closed').length;
      const currentToFix = currentBugs.filter(b => b.devStatus === 'Open' || b.devStatus === 'In Progress').length;
      const currentFixed = currentBugs.filter(b => b.devStatus === 'Fixed' && b.testerStatus !== 'Closed').length;
      const currentRetest = currentBugs.filter(b => b.testerStatus === 'Retest').length;
      const currentClosed = currentBugs.filter(b => b.testerStatus === 'Closed').length;

      const initialBugs = INITIAL_BUGS.filter(b => b.assignedTo === name);
      const initialActive = initialBugs.filter(b => b.devStatus !== 'Fixed' && b.testerStatus !== 'Closed').length;
      const initialToFix = initialBugs.filter(b => b.devStatus === 'Open' || b.devStatus === 'In Progress').length;
      const initialFixed = initialBugs.filter(b => b.devStatus === 'Fixed' && b.testerStatus !== 'Closed').length;
      const initialRetest = initialBugs.filter(b => b.testerStatus === 'Retest').length;
      const initialClosed = initialBugs.filter(b => b.testerStatus === 'Closed').length;

      const offsetActive = currentActive - initialActive;
      const offsetToFix = currentToFix - initialToFix;
      const offsetFixed = currentFixed - initialFixed;
      const offsetRetest = currentRetest - initialRetest;
      const offsetClosed = currentClosed - initialClosed;

      return {
        name,
        role: TEAM_MEMBERS[name]?.role || 'Developer',
        active: Math.max(0, base.active + offsetActive),
        toFix: Math.max(0, base.toFix + offsetToFix),
        fixed: Math.max(0, base.fixed + offsetFixed),
        retest: Math.max(0, base.retest + offsetRetest),
        closed: Math.max(0, base.closed + offsetClosed),
        max: 20
      };
    });
  }, [bugs]);

  const workloadMemberBugs = useMemo(() => {
    if (!selectedWorkloadMember) return [];
    
    const memberBugs = bugs.filter(b => b.assignedTo === selectedWorkloadMember);

    return memberBugs.filter(bug => {
      if (workloadFilterTab === 'All') return true;
      if (workloadFilterTab === 'Active') {
        return bug.devStatus !== 'Fixed' && bug.testerStatus !== 'Closed';
      }
      if (workloadFilterTab === 'To Fix') {
        return bug.devStatus === 'Open' || bug.devStatus === 'In Progress';
      }
      if (workloadFilterTab === 'Fixed') {
        return bug.devStatus === 'Fixed' && bug.testerStatus !== 'Closed';
      }
      if (workloadFilterTab === 'Retest') {
        return bug.testerStatus === 'Retest';
      }
      if (workloadFilterTab === 'Closed') {
        return bug.testerStatus === 'Closed';
      }
      return true;
    });
  }, [bugs, selectedWorkloadMember, workloadFilterTab]);

  // Operations Board filtered list (Bugs tab)
  const operationsFilteredBugs = useMemo(() => {
    return bugs.filter(bug => {
      const query = boardSearch.toLowerCase();
      const matchSearch = bug.id.toLowerCase().includes(query) || 
                          bug.project.toLowerCase().includes(query) ||
                          bug.module.toLowerCase().includes(query) ||
                          bug.description.toLowerCase().includes(query);
      const matchPriority = boardPriorityFilter === 'All' || bug.priority === boardPriorityFilter;
      const matchSeverity = boardSeverityFilter === 'All' || bug.severity === boardSeverityFilter;
      return matchSearch && matchPriority && matchSeverity;
    });
  }, [bugs, boardSearch, boardPriorityFilter, boardSeverityFilter]);

  // Trigger temporary success notification toast
  const triggerToast = (message) => {
    setSuccessToast(message);
    setTimeout(() => setSuccessToast(null), 4000);
  };

  // Login Handler
  const handleLogin = (email, password, username) => {
    let matchedName = username ? username.trim() : '';
    let matchedEmail = email || 'priya@qamind.io';

    if (!matchedName) {
      matchedName = 'Priya Sharma';
      const normalizedEmail = matchedEmail.toLowerCase();
      if (normalizedEmail.includes('rahul')) matchedName = 'Rahul Verma';
      else if (normalizedEmail.includes('arun')) matchedName = 'Arun Kumar';
      else if (normalizedEmail.includes('dev')) matchedName = 'Dev Nair';
      else if (normalizedEmail.includes('sneha')) matchedName = 'Sneha Patel';
    }

    const loginUser = {
      name: matchedName,
      email: matchedEmail,
      role: TEAM_MEMBERS[matchedName]?.role || 'QA Engineer',
      avatarColor: TEAM_MEMBERS[matchedName]?.color || '#8b5cf6',
      initials: TEAM_MEMBERS[matchedName] ? TEAM_MEMBERS[matchedName].initials : matchedName.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase(),
      avatarUrl: TEAM_MEMBERS[matchedName]?.avatarUrl || null
    };

    setUser(loginUser);
    triggerToast(`Welcome back to QA MIND, ${loginUser.name}!`);
  };

  // Logout Handler
  const handleLogout = () => {
    setUser(null);
    setActiveTab('Dashboard');
  };

  // Create Bug Handler
  const handleCreateBug = (e) => {
    e.preventDefault();
    if (!formDescription.trim()) {
      alert('Please enter a description for the bug.');
      return;
    }

    const nextIdNumber = bugs.reduce((acc, curr) => {
      const num = parseInt(curr.id.split('-')[1]);
      return num > acc ? num : acc;
    }, 125) + 1;

    const newBug = {
      id: `BUG-${nextIdNumber}`,
      project: formProject,
      module: formModule,
      subModule: formSubModule,
      description: formDescription,
      priority: formPriority,
      severity: formSeverity,
      assignedTo: formAssignedTo,
      assignedBy: user.name,
      assignedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      devStatus: 'Open',
      testerStatus: 'Open',
      updatedTime: 'Just now',
      comments: []
    };

    setBugs([newBug, ...bugs]);
    
    // Add to Live Activities
    const newActivity = {
      id: Date.now(),
      user: user.name,
      action: `created bug report`,
      bugId: newBug.id,
      timestamp: 'Just now',
      status: 'Open',
      avatarType: 'bug'
    };
    setActivities([newActivity, ...activities]);

    // Clear form & redirect
    setFormDescription('');
    setActiveTab('Dashboard');
    triggerToast(`Successfully registered defect ${newBug.id}!`);
  };

  // Clear bug form
  const handleClearForm = () => {
    setFormDescription('');
    setFormPriority('P2');
    setFormSeverity('High');
    setFormAssignedTo('Rahul Verma');
  };

  // Open Status Update Side Drawer
  const openStatusUpdateDrawer = (bug) => {
    setUpdateBugId(bug.id);
    setEditDevStatus(bug.devStatus);
    setEditComment('');
  };

  // Save Status Update Handler
  const handleSaveStatusUpdate = () => {
    setBugs(bugs.map(bug => {
      if (bug.id === updateBugId) {
        const updatedComments = [...bug.comments];
        if (editComment.trim()) {
          updatedComments.push({
            author: user.name,
            text: editComment.trim(),
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
          });
        }
        
        let newTesterStatus = bug.testerStatus;
        let newFixedDate = bug.fixedDate;
        
        if (editDevStatus === 'Fixed') {
          newTesterStatus = 'Retest'; // Moves automatically to Retest pending tester confirmation
          newFixedDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        } else if (editDevStatus === 'In Progress') {
          newTesterStatus = 'Open';
        }

        return {
          ...bug,
          devStatus: editDevStatus,
          testerStatus: newTesterStatus,
          fixedDate: newFixedDate,
          comments: updatedComments,
          updatedTime: 'Just now'
        };
      }
      return bug;
    }));

    // Add activity
    const newActivity = {
      id: Date.now(),
      user: user.name,
      action: `updated Developer Status to "${editDevStatus}"`,
      bugId: updateBugId,
      timestamp: 'Just now',
      status: editDevStatus === 'Fixed' ? 'Fixed' : editDevStatus === 'In Progress' ? 'In Progress' : 'Open',
      avatarType: editDevStatus === 'Fixed' ? 'check' : 'user'
    };
    setActivities([newActivity, ...activities]);

    triggerToast(`Updated developer status for ${updateBugId}`);
    setUpdateBugId(null);
  };

  // Switch tabs and select a bug in Bugs board
  const handleLinkToBug = (bugId) => {
    setBoardSearch(bugId);
    setExpandedBugId(bugId);
    setSelectedWorkloadMember(null); 
    setActiveTab('Bugs');
  };

  // Visual severity class configurations matching dark neon colors
  const getSeverityBadgeClass = (severity) => {
    switch(severity) {
      case 'Critical': return 'bg-red-500/10 text-red-400 border border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.1)]';
      case 'High': return 'bg-orange-500/10 text-orange-400 border border-orange-500/20 shadow-[0_0_10px_rgba(249,115,22,0.1)]';
      case 'Medium': return 'bg-amber-500/10 text-amber-300 border border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]';
      case 'Low': return 'bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.1)]';
      default: return 'bg-slate-500/10 text-slate-400 border border-slate-500/20';
    }
  };

  const getPriorityBadgeClass = (priority) => {
    switch(priority) {
      case 'P1': return 'bg-red-500/15 text-red-400 border border-red-500/25';
      case 'P2': return 'bg-orange-500/15 text-orange-400 border border-orange-500/25';
      case 'P3': return 'bg-amber-500/15 text-amber-300 border border-amber-500/25';
      case 'P4': return 'bg-blue-500/15 text-blue-400 border border-blue-500/25';
      default: return 'bg-slate-800 text-slate-400 border border-slate-700';
    }
  };

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'Open': return 'bg-purple-500/10 text-purple-400 border border-purple-500/20';
      case 'In Progress': return 'bg-blue-500/10 text-blue-450 border border-blue-500/20';
      case 'Fixed': return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
      case 'Retest': return 'bg-orange-500/10 text-orange-450 border border-orange-500/20';
      case 'Closed': return 'bg-slate-500/10 text-slate-400 border border-slate-500/20';
      default: return 'bg-slate-800 text-slate-400';
    }
  };

  // Render Login Page if user is not authenticated
  if (!user) {
    return <LoginView onLogin={handleLogin} />;
  }

  return (
    <div className="app-container-custom w-screen h-screen overflow-hidden bg-[#EEF6FF] text-[#0F172A] flex font-sans relative">
      {/* Background Glowing Ambient Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] ambient-glow-1 animate-float-glow pointer-events-none select-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] ambient-glow-2 animate-float-glow pointer-events-none select-none" />
      <div className="absolute top-[30%] left-[40%] w-[35%] h-[35%] rounded-full blur-[130px] ambient-glow-3 pointer-events-none select-none" />
      
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-6 right-6 z-50 bg-white/95 border border-[#BFDBFE] backdrop-blur-md text-[#0F172A] px-5 py-3.5 rounded-xl shadow-xl shadow-blue-100/40 flex items-center gap-3 animate-fade-in font-semibold">
          <div className="w-2.5 h-2.5 rounded-full bg-[#38BDF8] animate-pulse glow-sky" />
          <span className="text-sm font-semibold text-[#475569]">{successToast}</span>
        </div>
      )}

      {/* LEFT SIDEBAR NAVIGATION */}
      <aside className="w-64 glass-sidebar flex flex-col justify-between py-6 px-5 flex-shrink-0 z-10 relative">
        <div className="flex flex-col gap-6">
          {/* Logo container */}
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 flex-shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <linearGradient id="sidebarLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#7dd3fc" />
                  </linearGradient>
                </defs>
                <path d="M 10 47 L 10 28 L 50 5 L 90 28 L 90 47 L 74 47 L 74 38 L 50 24 L 26 38 L 26 47 Z" fill="url(#sidebarLogoGrad)" />
                <path d="M 90 53 L 90 72 L 50 95 L 10 72 L 10 53 L 26 53 L 26 62 L 50 76 L 74 62 L 74 53 Z" fill="url(#sidebarLogoGrad)" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm tracking-wider text-[#0F172A] font-title leading-tight">QA MIND</span>
              <span className="text-[6.5px] text-[#38BDF8] font-bold uppercase tracking-widest leading-none mt-1 font-mono">WHERE DEVELOPERS LOSE PEACE</span>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex flex-col gap-1.5 mt-2">
            {[
              { name: 'Dashboard', icon: LayoutDashboard },
              { name: 'Create Bug', icon: PlusCircle },
              { name: 'Settings', icon: SettingsIcon }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.name;
              return (
                <button 
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-[13px] font-semibold transition-all duration-300 relative border ${
                    isActive 
                      ? 'bg-[#E0F2FE] border-[#BFDBFE] text-[#0F172A] shadow-[0_2px_10px_rgba(56,189,248,0.1)] font-medium' 
                      : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#E0F2FE]/50 hover:border-[#BFDBFE]/30 border-transparent'
                  }`}
                >
                  <Icon size={17} className={isActive ? 'text-[#38BDF8]' : 'text-[#475569] transition-colors'} />
                  <span>{tab.name}</span>
                  {isActive && (
                    <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-[#38BDF8] glow-sky" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User profile section */}
        <div className="flex flex-col gap-4 border-t border-[#BFDBFE]/60 pt-5">
          <div className="flex items-center gap-3 px-1">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full object-cover border border-[#BFDBFE] shadow-sm" />
            ) : (
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white select-none shadow-sm text-xs"
                style={{ backgroundColor: user.avatarColor }}
              >
                {user.initials}
              </div>
            )}
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-[#0F172A] truncate leading-snug">{user.name}</span>
              <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider leading-none flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Active QA</span>
              </span>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-red-500 hover:bg-red-50 hover:text-red-600 transition-all w-full text-left border border-transparent hover:border-red-200"
          >
            <LogOut size={13} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN LAYOUT HEADER + CONTENT CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        {/* TOP NAVBAR */}
        <header className="h-20 glass-navbar px-8 flex items-center justify-between flex-shrink-0 z-20">
          <div className="flex items-center gap-4">
            {/* Logo on Left of Navbar */}
            <div className="flex items-center gap-2 md:hidden">
              <div className="w-6 h-6 flex-shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <defs>
                    <linearGradient id="mobileLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor="#7dd3fc" />
                    </linearGradient>
                  </defs>
                  <path d="M 10 47 L 10 28 L 50 5 L 90 28 L 90 47 L 74 47 L 74 38 L 50 24 L 26 38 L 26 47 Z" fill="url(#mobileLogoGrad)" />
                  <path d="M 90 53 L 90 72 L 50 95 L 10 72 L 10 53 L 26 53 L 26 62 L 50 76 L 74 62 L 74 53 Z" fill="url(#mobileLogoGrad)" />
                </svg>
              </div>
              <span className="font-extrabold text-sm text-[#0F172A] font-title leading-none">QA MIND</span>
            </div>
            
            <div className="hidden md:flex items-center gap-3 text-xs font-semibold select-none">
              <span className="text-[#475569] hover:text-[#0F172A] transition-colors cursor-pointer" onClick={() => setActiveTab('Dashboard')}>QA MIND</span>
              <span className="text-[#BFDBFE]">/</span>
              <span className="text-[#0F172A] font-bold">{activeTab}</span>
              {activeTab !== 'Dashboard' && activeTab !== 'Create Bug' && activeTab !== 'Settings' && (
                <>
                  <span className="text-[#BFDBFE]">/</span>
                  <button 
                    onClick={() => setActiveTab('Dashboard')}
                    className="ml-2 px-2.5 py-1 rounded-lg bg-[#E0F2FE] border border-[#BFDBFE] text-[10px] text-[#38BDF8] hover:text-[#0F172A] hover:bg-[#E0F2FE]/80 transition-all font-bold uppercase tracking-wider"
                  >
                    ← Back to Dashboard
                  </button>
                </>
              )}
              <span className="ml-3 text-[9px] text-[#38BDF8] font-bold bg-[#E0F2FE] px-2.5 py-0.5 rounded-full border border-[#BFDBFE] tracking-widest font-mono shadow-[0_2px_10px_rgba(56,189,248,0.1)]">
                ENV: PROD
              </span>
            </div>
          </div>

          {/* Search bar layout matching premium SaaS aesthetics */}
          <div className="relative w-96 max-w-md hidden md:block">
            <Search size={14} className="absolute left-4 top-3.5 text-[#94A3B8]" />
            <input 
              type="text" 
              placeholder="Search bugs, modules, actions..." 
              value={boardSearch}
              onChange={(e) => {
                setBoardSearch(e.target.value);
                if (activeTab !== 'Bugs' && activeTab !== 'Dashboard') {
                  setActiveTab('Bugs');
                }
              }}
              className="w-full h-10 pl-11 pr-12 rounded-xl bg-white border border-[#BFDBFE] text-xs text-[#0F172A] placeholder-[#94A3B8] focus:bg-white focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20 outline-none transition-all"
            />
            <span className="absolute right-4 top-3 text-[9px] font-bold text-[#94A3B8] bg-[#EEF6FF] border border-[#BFDBFE] px-1.5 py-0.5 rounded select-none font-mono">
              ⌘K
            </span>
          </div>

          <div className="flex items-center gap-5">
            {/* Bell/Notification trigger */}
            <div className="relative">
              <button 
                onClick={() => setShowNotificationPopup(!showNotificationPopup)}
                className="w-10 h-10 rounded-xl border border-[#BFDBFE] bg-white flex items-center justify-center text-[#475569] hover:text-[#0F172A] hover:border-[#38BDF8] hover:bg-[#E0F2FE]/50 transition-all"
              >
                <Bell size={17} />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#38BDF8] border border-white" />
              </button>

              {/* Notification Dropdown popup */}
              {showNotificationPopup && (
                <div className="absolute right-0 mt-3 w-80 rounded-2xl border border-[#BFDBFE] bg-white p-4 shadow-xl shadow-blue-100/30 z-30 animate-scale-up">
                  <div className="flex justify-between items-center pb-2 border-b border-[#BFDBFE]/50 mb-3">
                    <span className="text-xs font-bold text-[#475569] uppercase tracking-wider">System Alerts</span>
                    <button 
                      onClick={() => setShowNotificationPopup(false)} 
                      className="text-[#94A3B8] hover:text-[#0F172A]"
                    >
                      <X size={13} />
                    </button>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <div className="flex gap-3 text-xs p-2 rounded-lg bg-[#F8FBFF] hover:bg-[#E0F2FE] cursor-pointer transition-all border border-[#BFDBFE]/50 hover:border-[#38BDF8]/30">
                      <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 flex-shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.4)]" />
                      <div>
                        <p className="text-[#0F172A] font-semibold">Critical Priority defect BUG-125</p>
                        <p className="text-[10px] text-[#94A3B8] mt-0.5">10 mins ago</p>
                      </div>
                    </div>
                    <div className="flex gap-3 text-xs p-2 rounded-lg bg-[#F8FBFF] hover:bg-[#E0F2FE] cursor-pointer transition-all border border-[#BFDBFE]/50 hover:border-[#38BDF8]/30">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                      <div>
                        <p className="text-[#0F172A] font-semibold">Arun Kumar resolved BUG-124</p>
                        <p className="text-[10px] text-[#94A3B8] mt-0.5">1 hour ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar header */}
            <div className="flex items-center gap-3 border-l border-[#BFDBFE]/60 pl-5">
              <div className="flex flex-col items-end">
                <span className="text-xs font-bold text-[#0F172A] leading-tight">{user.name}</span>
                <span className="text-[9px] text-[#475569] font-bold uppercase tracking-wider">{user.role}</span>
              </div>
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt={user.name} className="w-9 h-9 rounded-full object-cover border border-[#BFDBFE]" />
              ) : (
                <div 
                  className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-xs select-none shadow-sm"
                  style={{ backgroundColor: user.avatarColor }}
                >
                  {user.initials}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* TAB WORKSPACES CONTENT */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col gap-6 md:gap-8">
          {activeTab === 'Dashboard' && (
            <DashboardView 
              bugs={bugs}
              metrics={metrics}
              activities={activities}
              workloadData={workloadData}
              selectedProject={selectedProject}
              selectedModule={selectedModule}
              selectedSubModule={selectedSubModule}
              onProjectChange={handleProjectFilterChange}
              onModuleChange={handleModuleFilterChange}
              onSubModuleChange={setSelectedSubModule}
              filteredBugs={dashboardFilteredBugs}
              getSeverityBadgeClass={getSeverityBadgeClass}
              getStatusBadgeClass={getStatusBadgeClass}
              teamMembers={TEAM_MEMBERS}
              onSelectDeveloper={(name) => {
                setSelectedWorkloadMember(name);
                setWorkloadFilterTab('All');
                setActiveTab('Developers');
              }}
              onLinkToBug={handleLinkToBug}
            />
          )}

          {activeTab === 'Bugs' && (
            <BugsView 
              bugs={operationsFilteredBugs}
              search={boardSearch}
              setSearch={setBoardSearch}
              priorityFilter={boardPriorityFilter}
              setPriorityFilter={setBoardPriorityFilter}
              severityFilter={boardSeverityFilter}
              setSeverityFilter={setBoardSeverityFilter}
              expandedBugId={expandedBugId}
              setExpandedBugId={setExpandedBugId}
              onUpdateStatus={openStatusUpdateDrawer}
              getSeverityBadgeClass={getSeverityBadgeClass}
              getPriorityBadgeClass={getPriorityBadgeClass}
              getStatusBadgeClass={getStatusBadgeClass}
              teamMembers={TEAM_MEMBERS}
            />
          )}

          {activeTab === 'Retesting' && (
            <RetestingView 
              bugs={bugs}
              setBugs={setBugs}
              activities={activities}
              setActivities={setActivities}
              triggerToast={triggerToast}
              getSeverityBadgeClass={getSeverityBadgeClass}
              getStatusBadgeClass={getStatusBadgeClass}
              teamMembers={TEAM_MEMBERS}
              user={user}
            />
          )}

          {activeTab === 'Developers' && (
            <DevelopersView 
              bugs={bugs}
              workloadData={workloadData}
              selectedWorkloadMember={selectedWorkloadMember}
              setSelectedWorkloadMember={setSelectedWorkloadMember}
              workloadFilterTab={workloadFilterTab}
              setWorkloadFilterTab={setWorkloadFilterTab}
              workloadMemberBugs={workloadMemberBugs}
              teamMembers={TEAM_MEMBERS}
              getSeverityBadgeClass={getSeverityBadgeClass}
              getStatusBadgeClass={getStatusBadgeClass}
              handleLinkToBug={handleLinkToBug}
            />
          )}

          {activeTab === 'Projects' && (
            <ProjectsView 
              bugs={bugs}
            />
          )}

          {activeTab === 'Reports' && (
            <ReportsView 
              bugs={bugs}
              metrics={metrics}
            />
          )}

          {activeTab === 'Settings' && (
            <SettingsView 
              user={user}
              setUser={setUser}
              triggerToast={triggerToast}
            />
          )}

          {activeTab === 'Create Bug' && (
            <CreateBugView 
              formProject={formProject}
              setFormProject={setFormProject}
              formModule={formModule}
              setFormModule={setFormModule}
              formSubModule={formSubModule}
              setFormSubModule={setFormSubModule}
              formAssignedTo={formAssignedTo}
              setFormAssignedTo={setFormAssignedTo}
              formPriority={formPriority}
              setFormPriority={setFormPriority}
              formSeverity={formSeverity}
              setFormSeverity={setFormSeverity}
              formDescription={formDescription}
              setFormDescription={setFormDescription}
              onSubmit={handleCreateBug}
              onClear={handleClearForm}
              PROJECT_MODULES={PROJECT_MODULES}
              MODULE_SUBMODULES={MODULE_SUBMODULES}
            />
          )}
        </main>
      </div>

      {/* UPDATE STATUS MODAL (SIDE DRAWER popup modal) */}
      {updateBugId && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
          <div 
            className="absolute inset-0"
            onClick={() => setUpdateBugId(null)}
          />
          <div className="relative w-[500px] h-full shadow-2xl bg-[#0b0e1f]/95 border-l border-white/10 flex flex-col justify-between py-8 px-6 animate-slide-in">
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2 font-title">
                    <span>Update Status</span>
                    <span className="font-mono text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                      {updateBugId}
                    </span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">Set Developer resolution metrics and comments.</p>
                </div>
                <button 
                  onClick={() => setUpdateBugId(null)}
                  className="p-2 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-all border border-white/5"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Bug Details overview */}
              {(() => {
                const b = bugs.find(x => x.id === updateBugId);
                if (!b) return null;
                return (
                  <div className="flex flex-col gap-4 border-y border-white/5 py-4">
                    <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs">
                      <div>
                        <span className="text-slate-500 block font-medium">Project</span>
                        <span className="text-slate-200 font-bold block truncate mt-0.5">{b.project}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block font-medium">Module / Sub Module</span>
                        <span className="text-slate-200 font-bold block truncate mt-0.5">{b.module} • {b.subModule}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block font-medium">Severity</span>
                        <span className={`badge px-2 py-0.5 text-[9.5px] mt-1 inline-block rounded font-bold ${getSeverityBadgeClass(b.severity)}`}>
                          {b.severity}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 block font-medium">Tester Status</span>
                        <span className={`badge px-2 py-0.5 text-[9.5px] mt-1 inline-block rounded font-bold ${getStatusBadgeClass(b.testerStatus)}`}>
                          {b.testerStatus}
                        </span>
                      </div>
                    </div>
                    <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                      <span className="text-[9px] text-slate-550 uppercase font-bold font-mono tracking-wider block mb-1">Description</span>
                      <p className="text-xs text-slate-300 leading-relaxed max-h-24 overflow-y-auto">{b.description}</p>
                    </div>
                  </div>
                );
              })()}

              {/* Input section */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-400">Developer Status</label>
                  <select 
                    value={editDevStatus}
                    onChange={(e) => setEditDevStatus(e.target.value)}
                    className="w-full h-11 px-4 text-xs rounded-xl bg-white/5 border border-white/5 text-slate-200 cursor-pointer focus:bg-[#121630] focus:border-indigo-500/30 outline-none"
                  >
                    <option value="Open" className="bg-[#111827]">Open</option>
                    <option value="In Progress" className="bg-[#111827]">In Progress</option>
                    <option value="Fixed" className="bg-[#111827]">Fixed</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-400">Comment / Resolution Notes</label>
                  <textarea 
                    value={editComment}
                    onChange={(e) => setEditComment(e.target.value)}
                    placeholder="Provide details on the fix, troubleshooting, or current blocker status..."
                    className="w-full min-h-[120px] max-h-[160px] p-4 text-xs rounded-xl bg-white/5 border border-white/5 text-slate-250 placeholder-slate-500 focus:bg-[#121630] focus:border-indigo-500/30 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Save Buttons */}
            <div className="flex gap-3 pt-6 border-t border-white/5">
              <button 
                onClick={() => setUpdateBugId(null)}
                className="flex-1 h-12 rounded-xl text-slate-400 font-bold border border-white/5 hover:bg-white/5 hover:text-white transition-all text-xs"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveStatusUpdate}
                className="flex-1 h-12 rounded-xl bg-gradient-to-r from-[#38bdf8] to-[#22d3ee] text-black font-bold hover:brightness-110 transition-all text-xs shadow-lg shadow-sky-600/20"
              >
                Save Update
              </button>
            </div>
          </div>
        </div>
        )}
    </div>
  );
}

// --------------------------------
// LOGIN VIEW COMPONENT
// --------------------------------
function LoginView({ onLogin }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password, username);
  };
  return (
    <div className="w-screen h-screen overflow-hidden flex items-center justify-center bg-[#EEF6FF] relative font-sans module-bg-container">
      <div className="module-bg-overlay" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80")' }} />
      {/* Background glowing decorations */}
      <div className="absolute top-[20%] left-[20%] w-[450px] h-[450px] bg-[#38BDF8]/10 rounded-full blur-[120px] select-none pointer-events-none animate-pulse" />
      <div className="absolute bottom-[20%] right-[20%] w-[450px] h-[450px] bg-[#38BDF8]/10 rounded-full blur-[120px] select-none pointer-events-none animate-pulse" />

      {/* Login Card */}
      <div className="w-[430px] rounded-3xl p-10 bg-white/90 backdrop-blur-xl border border-[#BFDBFE] shadow-[0_8px_30px_rgba(191,219,254,0.3)] relative z-10 flex flex-col items-center">
        {/* Title Logo */}
        <div className="flex items-center gap-3.5 mb-2">
          <div className="w-11 h-11 flex-shrink-0">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <defs>
                <linearGradient id="loginLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#7dd3fc" />
                </linearGradient>
              </defs>
              <path d="M 10 47 L 10 28 L 50 5 L 90 28 L 90 47 L 74 47 L 74 38 L 50 24 L 26 38 L 26 47 Z" fill="url(#loginLogoGrad)" />
              <path d="M 90 53 L 90 72 L 50 95 L 10 72 L 10 53 L 26 53 L 26 62 L 50 76 L 74 62 L 74 53 Z" fill="url(#loginLogoGrad)" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-2.5xl tracking-wide text-[#0F172A] font-title leading-none">QA MIND</span>
            <span className="text-[7.5px] text-[#38BDF8] font-bold uppercase tracking-widest leading-none mt-1.5 font-mono">WHERE DEVELOPERS LOSE PEACE</span>
          </div>
        </div>
        
        <div className="w-12 h-px bg-[#BFDBFE]/60 my-6" />

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#475569] pl-1">Username / Full Name</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Priya Sharma"
              required
              autoComplete="off"
              className="w-full h-11 px-4 rounded-xl bg-white border border-[#BFDBFE] text-[#0F172A] text-xs placeholder-[#94A3B8] focus:bg-white focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20 outline-none transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#475569] pl-1">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="priya@qamind.io"
              required
              autoComplete="off"
              className="w-full h-11 px-4 rounded-xl bg-white border border-[#BFDBFE] text-[#0F172A] text-xs placeholder-[#94A3B8] focus:bg-white focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20 outline-none transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#475569] pl-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="off"
              className="w-full h-11 px-4 rounded-xl bg-white border border-[#BFDBFE] text-[#0F172A] text-xs placeholder-[#94A3B8] focus:bg-white focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20 outline-none transition-all"
            />
          </div>

          <button 
            type="submit" 
            className="w-full h-11 mt-2 rounded-xl bg-gradient-to-r from-[#38bdf8] to-[#7dd3fc] text-[#0F172A] font-bold hover:brightness-110 shadow-lg shadow-sky-400/20 hover:shadow-sky-400/35 transition-all text-xs"
          >
            Authenticate Workspace
          </button>
        </form>

        {/* Help Info text */}
        <div className="mt-6 bg-[#F8FBFF] p-4 rounded-xl border border-[#BFDBFE] text-center w-full">
          <p className="text-[11px] text-[#475569] leading-relaxed">
            <span className="font-semibold text-[#0F172A]">Quick-access login:</span> Use standard email (e.g. <span className="font-semibold text-[#38BDF8]">priya@qamind.io</span> or <span className="font-semibold text-[#38BDF8]">rahul@qamind.io</span>) to test workspace capabilities.
          </p>
        </div>
      </div>
    </div>
  );
}

// --------------------------------
// DASHBOARD VIEW COMPONENT
// --------------------------------
function DashboardView({ 
  bugs, 
  metrics, 
  activities, 
  workloadData,
  selectedProject, 
  selectedModule, 
  selectedSubModule, 
  onProjectChange, 
  onModuleChange, 
  onSubModuleChange, 
  filteredBugs,
  getSeverityBadgeClass,
  getStatusBadgeClass,
  teamMembers,
  onSelectDeveloper,
  onLinkToBug
}) {
  
  // Custom Donut Chart Arc Segment Generator
  const donutData = useMemo(() => {
    const open = bugs.filter(b => b.testerStatus === 'Open').length;
    const inProgress = bugs.filter(b => b.devStatus === 'In Progress' && b.testerStatus !== 'Closed').length;
    const retest = bugs.filter(b => b.testerStatus === 'Retest').length;
    const closed = bugs.filter(b => b.testerStatus === 'Closed').length;
    
    const total = open + inProgress + retest + closed;
    const r = 38;
    const circ = 2 * Math.PI * r; // ~238.76

    const segments = [
      { count: open, color: '#38bdf8', label: 'Open', glow: 'glow-sky' },
      { count: inProgress, color: '#22d3ee', label: 'In Progress', glow: 'glow-cyan' },
      { count: retest, color: '#fb923c', label: 'Retest', glow: 'glow-orange' },
      { count: closed, color: '#10b981', label: 'Closed', glow: 'glow-green' }
    ];

    let currentOffset = 0;
    const items = segments.map((seg, i) => {
      const percentage = total > 0 ? seg.count / total : 0;
      const dash = percentage * circ;
      const offset = circ - currentOffset;
      currentOffset += dash;

      return {
        ...seg,
        percentage: Math.round(percentage * 100),
        dashArray: `${dash} ${circ - dash}`,
        dashOffset: circ - offset + dash
      };
    });

    return { total, items, circ };
  }, [bugs]);

  // Sparkline data mapping
  const sparklineData = {
    active: 'M0,25 C15,15 30,28 45,10 C60,5 75,25 90,4 C95,2 100,2 100,2',
    retest: 'M0,28 C15,20 30,8 45,22 C60,28 75,5 90,12 C95,15 100,10 100,10',
    toFix: 'M0,15 C15,18 30,25 45,10 C60,2 75,18 90,8 C95,5 100,5 100,5',
    closed: 'M0,28 C15,25 30,12 45,28 C60,22 75,8 90,4 C95,2 100,2 100,2'
  };

  return (
    <div className="flex flex-col gap-6 md:gap-8 animate-fade-in text-[#475569] module-bg-container">
      <div className="module-bg-overlay" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80")' }} />
      {/* FILTER BAR DROPDOWNS */}
      <section className="p-4 px-6 rounded-2xl bg-white border border-[#BFDBFE] flex items-center justify-between flex-wrap gap-4 shadow-sm">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Project Dropdown */}
          <select 
            value={selectedProject}
            onChange={(e) => onProjectChange(e.target.value)}
            className="h-10 px-4 rounded-xl bg-white border border-[#BFDBFE] text-[#0F172A] text-xs font-semibold cursor-pointer outline-none focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20"
          >
            <option value="All" className="bg-white">All Projects</option>
            <option value="Payment Gateway" className="bg-white">Payment Gateway</option>
            <option value="Mobile App" className="bg-white">Mobile App</option>
            <option value="Web Portal" className="bg-white">Web Portal</option>
            <option value="Analytics Engine" className="bg-white">Analytics Engine</option>
          </select>

          {/* Module Dropdown */}
          <select 
            value={selectedModule}
            onChange={(e) => onModuleChange(e.target.value)}
            className="h-10 px-4 rounded-xl bg-white border border-[#BFDBFE] text-[#0F172A] text-xs font-semibold cursor-pointer outline-none focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20"
          >
            <option value="All" className="bg-white">All Modules</option>
            {selectedProject !== 'All' && PROJECT_MODULES[selectedProject]?.map(mod => (
              <option key={mod} value={mod} className="bg-white">{mod}</option>
            ))}
          </select>

          {/* SubModule Dropdown */}
          <select 
            value={selectedSubModule}
            onChange={(e) => onSubModuleChange(e.target.value)}
            className="h-10 px-4 rounded-xl bg-white border border-[#BFDBFE] text-[#0F172A] text-xs font-semibold cursor-pointer outline-none focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20"
          >
            <option value="All" className="bg-white">All Sub Modules</option>
            {selectedModule !== 'All' && MODULE_SUBMODULES[selectedModule]?.map(sub => (
              <option key={sub} value={sub} className="bg-white">{sub}</option>
            ))}
          </select>

          {/* Calendar Display */}
          <div className="h-10 px-4 rounded-xl bg-[#F8FBFF] border border-[#BFDBFE] flex items-center gap-2 text-xs font-semibold text-[#475569] select-none">
            <Calendar size={13} className="text-[#38BDF8]" />
            <span>Active Sprint Cycle</span>
          </div>
        </div>

        <button 
          onClick={() => {
            onProjectChange('All');
            onModuleChange('All');
            onSubModuleChange('All');
          }}
          className="h-10 px-4 rounded-xl border border-[#BFDBFE] bg-white hover:bg-[#E0F2FE]/50 text-xs font-bold text-[#475569] hover:text-[#0F172A] transition-all"
        >
          Clear Filters
        </button>
      </section>

      {/* TOP ANALTICS CARDS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Active Bugs */}
        <div className="p-6 rounded-2xl glass-card glass-card-hover flex flex-col gap-3 relative overflow-hidden group">
          {/* Card Hover Glow effect */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-red-500/10 transition-all" />
          <AlertCircle size={80} className="absolute right-[-10px] bottom-[-15px] text-red-500/5 pointer-events-none select-none group-hover:scale-110 transition-transform duration-300" />
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-bold text-[#475569] uppercase tracking-wider">Total Active Bugs</span>
              <span className="text-[9px] text-red-500 font-bold uppercase tracking-wide">QA Backlog</span>
            </div>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-500 to-orange-500 text-white flex items-center justify-center shadow-md shadow-red-500/20">
              <AlertCircle size={17} />
            </div>
          </div>
          <div className="flex items-baseline justify-between mt-2">
            <div className="flex flex-col">
              <span className="text-3.5xl font-extrabold text-[#0F172A] leading-tight font-title">{metrics.active}</span>
              <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
                <span>↑ 18.2%</span> <span className="text-[#94A3B8] font-medium">from last sprint</span>
              </span>
            </div>
            {/* Sparkline */}
            <div className="w-20 h-8 select-none">
              <svg viewBox="0 0 100 30" className="w-full h-full stroke-red-500 fill-none" strokeWidth="2" strokeLinecap="round">
                <path d={sparklineData.active} />
              </svg>
            </div>
          </div>
          <div className="h-px bg-[#BFDBFE]/60 my-1" />
          <span className="text-[10px] text-[#94A3B8] font-medium">Total active bugs unresolved in dev backlog</span>
        </div>

        {/* Retest Pending */}
        <div className="p-6 rounded-2xl glass-card glass-card-hover flex flex-col gap-3 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-indigo-500/10 transition-all" />
          <Clock size={80} className="absolute right-[-10px] bottom-[-15px] text-indigo-500/5 pointer-events-none select-none group-hover:scale-110 transition-transform duration-300" />
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-bold text-[#475569] uppercase tracking-wider">Retest Pending</span>
              <span className="text-[9px] text-indigo-500 font-bold uppercase tracking-wide font-mono">Verification queue</span>
            </div>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
              <Clock size={17} />
            </div>
          </div>
          <div className="flex items-baseline justify-between mt-2">
            <div className="flex flex-col">
              <span className="text-3.5xl font-extrabold text-[#0F172A] leading-tight font-title">{metrics.retest}</span>
              <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
                <span>↑ 9.4%</span> <span className="text-[#94A3B8] font-medium">from last week</span>
              </span>
            </div>
            {/* Sparkline */}
            <div className="w-20 h-8 select-none">
              <svg viewBox="0 0 100 30" className="w-full h-full stroke-indigo-500 fill-none" strokeWidth="2" strokeLinecap="round">
                <path d={sparklineData.retest} />
              </svg>
            </div>
          </div>
          <div className="h-px bg-[#BFDBFE]/60 my-1" />
          <span className="text-[10px] text-[#94A3B8] font-medium">Fixed defects waiting for QA verification</span>
        </div>

        {/* To Fix by Dev */}
        <div className="p-6 rounded-2xl glass-card glass-card-hover flex flex-col gap-3 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-sky-500/10 transition-all" />
          <Terminal size={80} className="absolute right-[-10px] bottom-[-15px] text-[#38BDF8]/5 pointer-events-none select-none group-hover:scale-110 transition-transform duration-300" />
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-bold text-[#475569] tracking-wider uppercase">To Fix by Dev</span>
              <span className="text-[9px] text-[#38BDF8] font-bold uppercase tracking-wide font-mono">Active sprint workload</span>
            </div>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#38bdf8] to-[#7dd3fc] text-[#0F172A] flex items-center justify-center shadow-md shadow-sky-500/20">
              <Terminal size={17} />
            </div>
          </div>
          <div className="flex items-baseline justify-between mt-2">
            <div className="flex flex-col">
              <span className="text-3.5xl font-extrabold text-[#0F172A] leading-tight font-title">{metrics.toFix}</span>
              <span className="text-[10px] text-red-500 font-bold flex items-center gap-1 mt-1">
                <span>↓ 4.6%</span> <span className="text-[#94A3B8] font-medium">from last sprint</span>
              </span>
            </div>
            {/* Sparkline */}
            <div className="w-20 h-8 select-none">
              <svg viewBox="0 0 100 30" className="w-full h-full stroke-[#38bdf8] fill-none" strokeWidth="2" strokeLinecap="round">
                <path d={sparklineData.toFix} />
              </svg>
            </div>
          </div>
          <div className="h-px bg-[#BFDBFE]/60 my-1" />
          <span className="text-[10px] text-[#94A3B8] font-medium">Open/In-progress dev assigned issues</span>
        </div>

        {/* Closed Bugs */}
        <div className="p-6 rounded-2xl glass-card glass-card-hover flex flex-col gap-3 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-500/10 transition-all" />
          <CheckCircle2 size={80} className="absolute right-[-10px] bottom-[-15px] text-emerald-500/5 pointer-events-none select-none group-hover:scale-110 transition-transform duration-300" />
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-bold text-[#475569] uppercase tracking-wider">Closed Bugs</span>
              <span className="text-[9px] text-emerald-600 font-bold uppercase tracking-wide font-mono">Archive Resolved</span>
            </div>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#11998e] to-[#38ef7d] text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
              <CheckCircle2 size={17} />
            </div>
          </div>
          <div className="flex items-baseline justify-between mt-2">
            <div className="flex flex-col">
              <span className="text-3.5xl font-extrabold text-[#0F172A] leading-tight font-title">{metrics.closed}</span>
              <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
                <span>↑ 24.1%</span> <span className="text-[#94A3B8] font-medium">cumulative close factor</span>
              </span>
            </div>
            {/* Sparkline */}
            <div className="w-20 h-8 select-none">
              <svg viewBox="0 0 100 30" className="w-full h-full stroke-emerald-500 fill-none" strokeWidth="2" strokeLinecap="round">
                <path d={sparklineData.closed} />
              </svg>
            </div>
          </div>
          <div className="h-px bg-[#BFDBFE]/60 my-1" />
          <span className="text-[10px] text-[#94A3B8] font-medium">Defects resolved and passed testing verification</span>
        </div>
      </section>

      {/* CHARTS AND TIMELINES SECTIONS */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        
        {/* Bug Status Donut Analytics (Spans 4 columns) */}
        <div className="lg:col-span-4 p-6 rounded-2xl glass-card flex flex-col justify-between min-h-[360px]">
          <div className="pb-2 border-b border-[#BFDBFE]/60 mb-3 flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#0F172A] font-title">Bug Status Allocation</h2>
            <span className="text-[9px] font-bold text-[#38BDF8] uppercase tracking-wider">Live metrics</span>
          </div>

          <div className="flex items-center justify-center py-4 relative">
            {/* SVG Donut */}
            <div className="relative w-44 h-44 select-none flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Underlay ring */}
                <circle cx="50" cy="50" r="38" fill="transparent" stroke="#F8FBFF" strokeWidth="8" />
                
                {/* Dynamically segments render */}
                {donutData.total > 0 ? (
                  donutData.items.map((item, idx) => {
                    if (item.count === 0) return null;
                    return (
                      <circle
                        key={idx}
                        cx="50"
                        cy="50"
                        r="38"
                        fill="transparent"
                        stroke={item.color}
                        strokeWidth="7"
                        strokeDasharray={item.dashArray}
                        strokeDashoffset={item.dashOffset}
                        className="transition-all duration-500 ease-out hover:stroke-[9px] cursor-pointer"
                        title={`${item.label}: ${item.count}`}
                      />
                    );
                  })
                ) : (
                  <circle cx="50" cy="50" r="38" fill="transparent" stroke="#F8FBFF" strokeWidth="6" />
                )}
              </svg>
              {/* Inner details */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-extrabold text-[#0F172A] font-title leading-none">{donutData.total}</span>
                <span className="text-[10px] text-[#94A3B8] uppercase font-bold tracking-wider mt-1">Total Bugs</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-[#BFDBFE]/60 text-xs">
            {donutData.items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-[#475569]">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="font-medium truncate">{item.label}</span>
                <span className="ml-auto font-mono font-bold text-[#0F172A]">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Activity Feed TIMELINE (Spans 4 columns) */}
        <div className="lg:col-span-4 p-6 rounded-2xl glass-card flex flex-col max-h-[380px]">
          <div className="flex justify-between items-center pb-2 border-b border-[#BFDBFE]/60 mb-4">
            <h2 className="text-sm font-bold text-[#0F172A] flex items-center gap-2 font-title">
              <Activity size={15} className="text-[#38BDF8]" />
              <span>Activity Timeline</span>
            </h2>
            <span className="text-[9px] font-bold text-[#10b981] bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full uppercase tracking-wider">Streaming</span>
          </div>
          <div className="flex-1 overflow-y-auto flex flex-col gap-4 pr-1">
            {activities.map((act) => (
              <div key={act.id} className="flex items-start gap-3 relative group">
                {/* Timeline connector thread */}
                <div className="absolute left-3.5 top-7 bottom-[-16px] w-px bg-[#BFDBFE] group-last:hidden" />
                <div className="w-7 h-7 rounded-full bg-[#E0F2FE] border border-[#BFDBFE]/60 flex items-center justify-center text-[#475569] flex-shrink-0">
                  {act.avatarType === 'bug' && <AlertCircle size={12} className="text-red-500" />}
                  {act.avatarType === 'user' && <User size={12} className="text-indigo-500" />}
                  {act.avatarType === 'sync' && <RefreshCw size={12} className="text-[#38BDF8] animate-spin-slow" />}
                  {act.avatarType === 'check' && <CheckCircle2 size={12} className="text-emerald-500" />}
                  {act.avatarType === 'user-orange' && <User size={12} className="text-orange-500" />}
                </div>
                <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                  <p className="text-xs text-[#475569] leading-snug">
                    <span 
                      onClick={() => onLinkToBug(act.bugId)}
                      className="font-bold text-[#38BDF8] hover:text-[#0f172a] transition-all cursor-pointer font-mono mr-1"
                    >
                      {act.bugId}
                    </span>
                    <span className="text-[#0F172A] font-semibold">{act.user}</span> {act.action}
                  </p>
                  <span className="text-[9px] text-[#94A3B8] font-bold">{act.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Extra Dashboard Widgets Column (Spans 4 columns) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Sprint Progress Widget */}
          <div className="p-5 rounded-2xl glass-card flex items-center gap-4 relative overflow-hidden group">
            {/* SVG Progress Arc Ring */}
            <div className="relative w-16 h-16 select-none flex items-center justify-center flex-shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15" fill="transparent" stroke="#F8FBFF" strokeWidth="3" />
                <circle cx="18" cy="18" r="15" fill="transparent" stroke="url(#sprintGrad)" strokeWidth="3" strokeDasharray="94.2" strokeDashoffset="30" strokeLinecap="round" />
                <defs>
                  <linearGradient id="sprintGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#7dd3fc" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-[#0F172A] font-title">68%</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-[#0F172A] font-title">Sprint 42 Target Release</span>
              <p className="text-[10px] text-[#475569] mt-0.5 leading-relaxed">
                4 days left • 14 resolved of 21 defects assigned
              </p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
                <span className="text-[9px] text-[#94A3B8] font-bold uppercase tracking-wider">Burn-down factors normal</span>
              </div>
            </div>
          </div>

          {/* Severity Overview Widget */}
          <div className="p-5 rounded-2xl glass-card flex flex-col gap-3">
            <div className="flex justify-between items-center pb-1.5 border-b border-[#BFDBFE]/60">
              <span className="text-xs font-bold text-[#0F172A] font-title">Severity Overview</span>
              <span className="text-[9px] font-bold text-[#94A3B8] font-mono">Category Allocation</span>
            </div>
            <div className="flex flex-col gap-2">
              {[
                { label: 'Critical', count: bugs.filter(b => b.severity === 'Critical').length, grad: 'from-red-500 to-rose-600', total: bugs.length },
                { label: 'High', count: bugs.filter(b => b.severity === 'High').length, grad: 'from-orange-500 to-pink-500', total: bugs.length },
                { label: 'Medium', count: bugs.filter(b => b.severity === 'Medium').length, grad: 'from-yellow-400 to-amber-500', total: bugs.length },
                { label: 'Low', count: bugs.filter(b => b.severity === 'Low').length, grad: 'from-blue-500 to-cyan-500', total: bugs.length }
              ].map((item, idx) => {
                const percent = item.total > 0 ? Math.round((item.count / item.total) * 100) : 0;
                return (
                  <div key={idx} className="flex flex-col gap-1 text-[11px]">
                    <div className="flex justify-between items-center text-[#475569] font-medium">
                      <span>{item.label}</span>
                      <span className="font-mono text-[#0F172A] font-bold">{item.count} <span className="text-[#94A3B8]">({percent}%)</span></span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                      <div className={`h-full rounded-full bg-gradient-to-r ${item.grad}`} style={{ width: `${percent}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* LOWER GRID: RECENT BUGS & TRENDS */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        
        {/* Recent Bugs Table (Spans 8 columns) */}
        <div className="lg:col-span-8 p-6 rounded-2xl glass-card flex flex-col gap-4">
          <div className="flex justify-between items-center pb-2 border-b border-[#BFDBFE]/60">
            <h2 className="text-sm font-bold text-[#0F172A] font-title">Recent Bugs</h2>
            <button className="text-xs text-[#38BDF8] font-bold hover:underline">View all defects</button>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="text-[#475569] font-bold uppercase tracking-wider border-b border-[#BFDBFE]">
                  <th className="py-3 px-3">Bug ID</th>
                  <th className="py-3 px-3">Module</th>
                  <th className="py-3 px-3">Severity</th>
                  <th className="py-3 px-3">Assigned Dev</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Updated</th>
                </tr>
              </thead>
              <tbody>
                {filteredBugs.slice(0, 5).map((bug) => {
                  const assignedUser = teamMembers[bug.assignedTo] || { initials: '?', color: '#4b5563' };
                  return (
                    <tr 
                      key={bug.id} 
                      className="border-b border-[#BFDBFE]/50 hover:bg-[#E0F2FE]/40 transition-all cursor-pointer group"
                      onClick={() => onLinkToBug(bug.id)}
                    >
                      <td className="py-4 px-3 font-mono font-bold text-[#38BDF8] group-hover:text-[#0F172A] transition-colors">
                        {bug.id}
                      </td>
                      <td className="py-4 px-3">
                        <span className="font-bold text-[#0F172A] block">{bug.project}</span>
                        <span className="text-[10px] text-[#475569] font-semibold block mt-0.5">{bug.module} • {bug.subModule}</span>
                      </td>
                      <td className="py-4 px-3">
                        <span className={`badge px-2 py-0.5 rounded-full font-bold text-[9.5px] ${getSeverityBadgeClass(bug.severity)}`}>
                          {bug.severity}
                        </span>
                      </td>
                      <td className="py-4 px-3">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-[8.5px] text-white"
                            style={{ backgroundColor: assignedUser.color }}
                          >
                            {assignedUser.initials}
                          </div>
                          <span className="text-[#475569] font-semibold">{bug.assignedTo}</span>
                        </div>
                      </td>
                      <td className="py-4 px-3">
                        <span className={`badge px-2 py-0.5 rounded font-bold text-[9.5px] ${getStatusBadgeClass(bug.devStatus)}`}>
                          {bug.devStatus}
                        </span>
                      </td>
                      <td className="py-4 px-3 text-[#94A3B8] font-semibold">{bug.updatedTime}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Weekly Bug Trends Widget (Spans 4 columns) */}
        <div className="lg:col-span-4 p-6 rounded-2xl glass-card flex flex-col justify-between min-h-[350px]">
          <div className="pb-2 border-b border-[#BFDBFE]/60 mb-3 flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#0F172A] font-title">Weekly Bug Trends</h2>
            <div className="flex gap-2 text-[10px] text-[#475569] font-medium">
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-pink-500" /> Logged</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Fixed</span>
            </div>
          </div>

          {/* SVG Trends Line Chart */}
          <div className="flex-1 w-full min-h-[160px] relative mt-2">
            <svg viewBox="0 0 200 100" className="w-full h-full">
              {/* Gridlines */}
              <line x1="10" y1="10" x2="190" y2="10" stroke="#F8FBFF" strokeWidth="0.5" />
              <line x1="10" y1="35" x2="190" y2="35" stroke="#F8FBFF" strokeWidth="0.5" />
              <line x1="10" y1="60" x2="190" y2="60" stroke="#F8FBFF" strokeWidth="0.5" />
              <line x1="10" y1="85" x2="190" y2="85" stroke="#F8FBFF" strokeWidth="0.5" />

              {/* Logged Bugs (Pink Line) */}
              <path d="M 15 75 Q 40 45, 65 65 T 115 30 T 165 50 T 185 15" fill="none" stroke="rgba(236,72,153,0.1)" strokeWidth="5" strokeLinecap="round" />
              <path d="M 15 75 Q 40 45, 65 65 T 115 30 T 165 50 T 185 15" fill="none" stroke="#ec4899" strokeWidth="1.5" strokeLinecap="round" />

              {/* Resolved Bugs (Green Line) */}
              <path d="M 15 85 Q 40 75, 65 55 T 115 50 T 165 25 T 185 20" fill="none" stroke="rgba(16,185,129,0.1)" strokeWidth="5" strokeLinecap="round" />
              <path d="M 15 85 Q 40 75, 65 55 T 115 50 T 165 25 T 185 20" fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" />
              
              {/* X Axis Labels */}
              <text x="15" y="95" fill="#94A3B8" fontSize="6" textAnchor="middle" fontWeight="bold">Mon</text>
              <text x="45" y="95" fill="#94A3B8" fontSize="6" textAnchor="middle" fontWeight="bold">Tue</text>
              <text x="75" y="95" fill="#94A3B8" fontSize="6" textAnchor="middle" fontWeight="bold">Wed</text>
              <text x="105" y="95" fill="#94A3B8" fontSize="6" textAnchor="middle" fontWeight="bold">Thu</text>
              <text x="135" y="95" fill="#94A3B8" fontSize="6" textAnchor="middle" fontWeight="bold">Fri</text>
              <text x="165" y="95" fill="#94A3B8" fontSize="6" textAnchor="middle" fontWeight="bold">Sat</text>
              <text x="185" y="95" fill="#94A3B8" fontSize="6" textAnchor="middle" fontWeight="bold">Sun</text>
            </svg>
          </div>

          <div className="h-px bg-[#BFDBFE]/60 my-2" />
          
          <div className="flex items-center justify-between text-[11px] text-[#475569]">
            <span className="font-semibold">Weekly Fix Velocity</span>
            <span className="text-[#10b981] font-extrabold flex items-center gap-1 font-mono">
              <TrendingUp size={12} />
              <span>+14.8% SLA rate</span>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

// --------------------------------
// BUGS VIEW COMPONENT (replaces Operations Board)
// --------------------------------
function BugsView({ 
  bugs, 
  search, 
  setSearch, 
  priorityFilter, 
  setPriorityFilter, 
  severityFilter, 
  setSeverityFilter, 
  expandedBugId, 
  setExpandedBugId,
  onUpdateStatus,
  getSeverityBadgeClass,
  getPriorityBadgeClass,
  getStatusBadgeClass,
  teamMembers
}) {
  const toggleRow = (bugId) => {
    if (expandedBugId === bugId) {
      setExpandedBugId(null);
    } else {
      setExpandedBugId(bugId);
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in text-slate-300 module-bg-container">
      <div className="module-bg-overlay" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80")' }} />
      {/* Search and Filter Panel */}
      <section className="p-4 px-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md flex flex-wrap gap-4 items-center justify-between shadow-sm">
        {/* Search */}
        <div className="relative w-80">
          <Search size={14} className="absolute left-4 top-3.5 text-slate-400" />
          <input 
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Bug ID, module, description..."
            className="w-full h-10 pl-11 pr-4 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-200 placeholder-slate-500 outline-none focus:bg-[#121630] focus:border-sky-500/30"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-550 font-bold">Priority:</span>
            <select 
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="h-9 px-3 rounded-lg bg-white/5 border border-white/5 text-slate-300 font-semibold cursor-pointer outline-none focus:border-sky-500/30"
            >
              <option value="All" className="bg-[#111827]">All</option>
              <option value="P1" className="bg-[#111827]">P1</option>
              <option value="P2" className="bg-[#111827]">P2</option>
              <option value="P3" className="bg-[#111827]">P3</option>
              <option value="P4" className="bg-[#111827]">P4</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-550 font-bold">Severity:</span>
            <select 
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="h-9 px-3 rounded-lg bg-white/5 border border-white/5 text-slate-300 font-semibold cursor-pointer outline-none focus:border-sky-500/30"
            >
              <option value="All" className="bg-[#111827]">All</option>
              <option value="Critical" className="bg-[#111827]">Critical</option>
              <option value="High" className="bg-[#111827]">High</option>
              <option value="Medium" className="bg-[#111827]">Medium</option>
              <option value="Low" className="bg-[#111827]">Low</option>
            </select>
          </div>
        </div>
      </section>

      {/* Modern Table-Card Hybrid list */}
      <section className="flex flex-col gap-3">
        {bugs.length > 0 ? (
          bugs.map((bug) => {
            const isExpanded = expandedBugId === bug.id;
            const assignedUser = teamMembers[bug.assignedTo] || { initials: '?', color: '#4b5563' };
            
            return (
              <div 
                key={bug.id} 
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isExpanded 
                    ? 'border-sky-500/30 bg-[#111827]/65 shadow-[0_0_20px_rgba(56,189,248,0.08)]' 
                    : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10'
                }`}
              >
                {/* Header row content */}
                <div 
                  onClick={() => toggleRow(bug.id)}
                  className="p-5 flex items-center justify-between cursor-pointer select-none"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <span className="font-mono text-xs font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">
                      {bug.id}
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className="font-bold text-white text-sm truncate font-title">{bug.project}</span>
                      <span className="text-xs text-slate-400 truncate font-semibold mt-0.5">{bug.module} • {bug.subModule}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 flex-shrink-0">
                    {/* Priority badge */}
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold font-mono ${getPriorityBadgeClass(bug.priority)}`}>
                      {bug.priority}
                    </span>

                    {/* Severity badge */}
                    <span className={`badge px-2.5 py-0.5 rounded-full font-bold text-[10px] ${getSeverityBadgeClass(bug.severity)}`}>
                      {bug.severity}
                    </span>

                    {/* Assigned Dev */}
                    <div className="flex items-center gap-2 w-36">
                      <div 
                        className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-[9px] text-white shadow-sm"
                        style={{ backgroundColor: assignedUser.color }}
                      >
                        {assignedUser.initials}
                      </div>
                      <span className="text-slate-350 text-xs font-bold truncate">{bug.assignedTo}</span>
                    </div>

                    {/* Status */}
                    <span className={`badge px-2.5 py-0.5 rounded text-[10px] font-bold ${getStatusBadgeClass(bug.devStatus)}`}>
                      {bug.devStatus}
                    </span>

                    {/* Expand Arrow */}
                    <div className="text-slate-400">
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </div>
                </div>

                {/* Expandable description + comments */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-white/5 bg-[#0a0d20]/50 flex flex-col gap-5 animate-fade-in">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs border-b border-white/5 pb-4 mt-2 font-mono">
                      <div>
                        <span className="text-slate-500 block font-bold uppercase tracking-wider">Sub Module</span>
                        <span className="text-slate-300 font-bold block mt-1">{bug.subModule}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block font-bold uppercase tracking-wider">Reported By</span>
                        <span className="text-slate-300 font-bold block mt-1">{bug.assignedBy}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block font-bold uppercase tracking-wider">Logged Date</span>
                        <span className="text-slate-300 font-bold block mt-1">{bug.assignedDate}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block font-bold uppercase tracking-wider">Fixed Date</span>
                        <span className="text-slate-300 font-bold block mt-1">{bug.fixedDate || '—'}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <span className="text-slate-500 font-bold text-xs uppercase tracking-wider">Description & Steps:</span>
                      <p className="text-xs text-slate-300 leading-relaxed bg-[#111531]/40 p-4 rounded-xl border border-white/5">
                        {bug.description}
                      </p>
                    </div>

                    {/* Comments thread */}
                    <div className="flex flex-col gap-2.5">
                      <span className="text-slate-400 font-bold text-xs flex items-center gap-1.5">
                        <MessageSquare size={13} className="text-indigo-400" />
                        <span>Resolution Thread ({bug.comments.length})</span>
                      </span>
                      {bug.comments.length > 0 ? (
                        <div className="flex flex-col gap-2">
                          {bug.comments.map((comm, idx) => (
                            <div key={idx} className="bg-[#111531]/30 p-3 rounded-lg border border-white/5 text-xs">
                              <div className="flex justify-between items-center mb-1 text-[9px] text-slate-500">
                                <span className="font-bold text-slate-350">{comm.author}</span>
                                <span className="font-mono">{comm.date}</span>
                              </div>
                              <p className="text-slate-300 font-medium">{comm.text}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-slate-550 text-xs italic pl-1">No comments documented yet.</p>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex justify-end gap-3 pt-3 border-t border-white/5 mt-1">
                      <button 
                        onClick={() => onUpdateStatus(bug)}
                        className="h-10 px-5 rounded-xl bg-indigo-650 text-white text-xs font-bold hover:bg-indigo-600 shadow-md shadow-indigo-600/10 transition-all border border-indigo-500/20"
                      >
                        Update Defect Status
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="py-16 text-center text-slate-500 bg-white/[0.02] rounded-2xl border border-white/5">
            <AlertOctagon size={24} className="mx-auto text-slate-600 mb-2" />
            <p className="font-bold">No results match your defect search filters.</p>
          </div>
        )}
      </section>
    </div>
  );
}

// --------------------------------
// RETESTING VIEW COMPONENT
// --------------------------------
function RetestingView({ 
  bugs, 
  setBugs, 
  activities, 
  setActivities, 
  triggerToast, 
  getSeverityBadgeClass, 
  getStatusBadgeClass, 
  teamMembers,
  user
}) {
  const [selectedBugId, setSelectedBugId] = useState(null);
  const [testerComment, setTesterComment] = useState('');

  // Filter only bugs waiting for retest
  const retestBugs = useMemo(() => {
    return bugs.filter(b => b.testerStatus === 'Retest' || b.devStatus === 'Fixed');
  }, [bugs]);

  const selectedBug = useMemo(() => {
    return bugs.find(b => b.id === selectedBugId) || null;
  }, [bugs, selectedBugId]);

  // Pass Retest / Close Bug
  const handlePassRetest = (bugId) => {
    setBugs(bugs.map(b => {
      if (b.id === bugId) {
        return {
          ...b,
          testerStatus: 'Closed',
          devStatus: 'Fixed',
          updatedTime: 'Just now'
        };
      }
      return b;
    }));

    // Add activity
    const newActivity = {
      id: Date.now(),
      user: user.name,
      action: `retest PASSED & closed defect`,
      bugId: bugId,
      timestamp: 'Just now',
      status: 'Closed',
      avatarType: 'check'
    };
    setActivities([newActivity, ...activities]);

    triggerToast(`Retest passed. Defect ${bugId} has been successfully closed!`);
    setSelectedBugId(null);
  };

  // Fail Retest / Reopen Bug
  const handleFailRetest = (e, bugId) => {
    e.preventDefault();
    if (!testerComment.trim()) {
      alert('Please provide failure notes describing why retest failed.');
      return;
    }

    setBugs(bugs.map(b => {
      if (b.id === bugId) {
        const updatedComments = [...b.comments];
        updatedComments.push({
          author: user.name,
          text: `RETEST FAILED: ${testerComment.trim()}`,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        });
        return {
          ...b,
          testerStatus: 'Open',
          devStatus: 'Open',
          comments: updatedComments,
          updatedTime: 'Just now'
        };
      }
      return b;
    }));

    // Add activity
    const newActivity = {
      id: Date.now(),
      user: user.name,
      action: `retest FAILED - defect reopened`,
      bugId: bugId,
      timestamp: 'Just now',
      status: 'Open',
      avatarType: 'sync'
    };
    setActivities([newActivity, ...activities]);

    triggerToast(`Retest failed. Defect ${bugId} reopened & returned to Developer queue.`);
    setTesterComment('');
    setSelectedBugId(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in text-slate-300 module-bg-container">
      <div className="module-bg-overlay" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=1200&q=80")' }} />
      
      {/* Left side list of bugs needing retest (Spans 5 columns) */}
      <div className="lg:col-span-5 p-6 rounded-2xl glass-card flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
        <div className="pb-2 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-sm font-bold text-white font-title">QA Verification Queue</h2>
          <span className="text-[10px] font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-500/25">{retestBugs.length} pending</span>
        </div>

        <div className="flex flex-col gap-3">
          {retestBugs.length > 0 ? (
            retestBugs.map(bug => {
              const assignedUser = teamMembers[bug.assignedTo] || { initials: '?', color: '#4b5563' };
              const isSelected = selectedBugId === bug.id;
              
              return (
                <div 
                  key={bug.id}
                  onClick={() => setSelectedBugId(bug.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected 
                      ? 'bg-sky-500/10 border-sky-400/30 shadow-[0_0_15px_rgba(56,189,248,0.1)]' 
                      : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span className="font-mono text-xs font-bold text-indigo-400">{bug.id}</span>
                    <span className={`badge px-2 py-0.5 rounded text-[8.5px] font-bold ${getSeverityBadgeClass(bug.severity)}`}>
                      {bug.severity}
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-white font-title truncate">{bug.project}</h3>
                  <p className="text-[10px] text-slate-400 truncate mt-0.5">{bug.module} • {bug.subModule}</p>
                  
                  <div className="flex items-center justify-between mt-3 border-t border-white/5 pt-2 text-[10px] text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center text-[7.5px] text-white" style={{ backgroundColor: assignedUser.color }}>
                        {assignedUser.initials}
                      </div>
                      <span>{bug.assignedTo}</span>
                    </div>
                    <span>{bug.updatedTime}</span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-slate-500 font-bold bg-white/[0.01] rounded-xl border border-white/5">
              Verification queue empty. All fixed bugs checked.
            </div>
          )}
        </div>
      </div>

      {/* Right side verification control panel (Spans 7 columns) */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        {selectedBug ? (
          <div className="p-6 rounded-2xl glass-card flex flex-col gap-5 animate-scale-up">
            <div className="flex justify-between items-start border-b border-white/5 pb-4">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2 font-title">
                  <span>Verify Defect</span>
                  <span className="font-mono text-xs font-semibold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">
                    {selectedBug.id}
                  </span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">{selectedBug.project} • {selectedBug.module}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`badge px-2 py-0.5 rounded-full font-bold text-[9px] ${getSeverityBadgeClass(selectedBug.severity)}`}>
                  {selectedBug.severity}
                </span>
                <span className={`badge px-2 py-0.5 rounded font-bold text-[9px] ${getStatusBadgeClass(selectedBug.devStatus)}`}>
                  Dev: {selectedBug.devStatus}
                </span>
              </div>
            </div>

            <div className="bg-[#0f1b31]/40 p-4 rounded-xl border border-white/5 flex flex-col gap-2.5">
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest font-mono">Original Description</span>
              <p className="text-xs text-slate-300 leading-relaxed font-semibold">{selectedBug.description}</p>
            </div>

            {/* Developer resolution comments */}
            <div className="flex flex-col gap-2 text-xs">
              <span className="text-slate-500 font-bold uppercase tracking-wider">Developer Resolution Thread</span>
              {selectedBug.comments.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {selectedBug.comments.map((comm, idx) => (
                    <div key={idx} className="bg-white/5 p-3 rounded-lg border border-white/5">
                      <div className="flex justify-between items-center mb-1 text-[9px] text-slate-500">
                        <span className="font-bold text-slate-300">{comm.author}</span>
                        <span>{comm.date}</span>
                      </div>
                      <p className="text-slate-300">{comm.text}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 italic">No developer comments recorded for this ticket.</p>
              )}
            </div>

            {/* QA Testing Operations buttons */}
            <div className="border-t border-white/5 pt-5 mt-2">
              <h3 className="text-xs font-bold text-white mb-3 font-title">Tester Verification Actions</h3>
              
              <div className="flex gap-4">
                {/* PASS RETEST */}
                <button 
                  onClick={() => handlePassRetest(selectedBug.id)}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs hover:brightness-110 shadow-lg shadow-emerald-600/10 transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={14} />
                  <span>Pass & Close Defect</span>
                </button>
              </div>

              <div className="my-6 h-px bg-white/5" />

              {/* FAIL RETEST FORM */}
              <form onSubmit={(e) => handleFailRetest(e, selectedBug.id)} className="flex flex-col gap-3">
                <label className="text-xs font-semibold text-slate-400">Reopen Reason / Failure Notes</label>
                <textarea 
                  value={testerComment}
                  onChange={(e) => setTesterComment(e.target.value)}
                  placeholder="Explain exactly why verification failed, logs collected, or reproduction details..."
                  className="w-full h-24 p-3 text-xs rounded-xl bg-white/5 border border-white/5 text-slate-200 placeholder-slate-500 focus:bg-[#121630] focus:border-indigo-500/30 outline-none"
                />
                <button 
                  type="submit"
                  className="py-3 px-4 rounded-xl border border-red-500/20 hover:border-red-500/35 bg-red-500/10 text-red-400 hover:text-red-300 text-xs font-bold transition-all flex items-center justify-center gap-2"
                >
                  <AlertCircle size={14} />
                  <span>Fail Retest & Reopen Ticket</span>
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="py-20 text-center text-slate-500 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col items-center justify-center p-6">
            <Sliders size={32} className="text-slate-600 mb-2" />
            <h3 className="font-bold text-white font-title">Select verification target</h3>
            <p className="text-xs text-slate-450 mt-1 max-w-xs">Select a defect from the pending verification queue on the left to pass or reopen.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// --------------------------------
// DEVELOPERS VIEW COMPONENT
// --------------------------------
function DevelopersView({ 
  bugs, 
  workloadData, 
  selectedWorkloadMember, 
  setSelectedWorkloadMember, 
  workloadFilterTab, 
  setWorkloadFilterTab, 
  workloadMemberBugs,
  teamMembers,
  getSeverityBadgeClass,
  getStatusBadgeClass,
  handleLinkToBug
}) {
  return (
    <div className="flex flex-col gap-8 animate-fade-in text-slate-300 module-bg-container">
      <div className="module-bg-overlay" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80")' }} />
      
      {/* Dev Team cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {workloadData.map(dev => {
          const profile = teamMembers[dev.name] || { initials: 'D', color: '#4b5563' };
          const activePercent = Math.round((dev.active / dev.max) * 100);
          const isSelected = selectedWorkloadMember === dev.name;

          return (
            <div 
              key={dev.name}
              onClick={() => {
                setSelectedWorkloadMember(dev.name);
                setWorkloadFilterTab('All');
              }}
              className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col gap-4 relative overflow-hidden group ${
                isSelected 
                  ? 'bg-indigo-500/10 border-indigo-400/30 shadow-lg' 
                  : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white select-none shadow-md text-sm"
                  style={{ backgroundColor: profile.color }}
                >
                  {profile.initials}
                </div>
                <div>
                  <h3 className="font-bold text-white font-title text-sm">{dev.name}</h3>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{profile.role}</span>
                </div>
              </div>

              {/* Progress workload bar */}
              <div className="flex flex-col gap-1 text-[10px] text-slate-450">
                <div className="flex justify-between items-center font-medium">
                  <span>Workload Index</span>
                  <span className="font-mono font-bold text-white">{activePercent}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500" style={{ width: `${Math.min(100, activePercent)}%` }} />
                </div>
              </div>

              {/* Counts stats grid */}
              <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-3 text-center text-xs">
                <div>
                  <span className="text-[9px] text-slate-500 block font-semibold uppercase">Active</span>
                  <span className="text-white font-extrabold block mt-0.5">{dev.active}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-500 block font-semibold uppercase">To Fix</span>
                  <span className="text-indigo-400 font-extrabold block mt-0.5">{dev.toFix}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-500 block font-semibold uppercase">Closed</span>
                  <span className="text-emerald-400 font-extrabold block mt-0.5">{dev.closed}</span>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Selected Developer active bugs task directory list */}
      <section className="flex flex-col gap-4">
        {selectedWorkloadMember ? (
          <div className="p-6 rounded-2xl glass-card flex flex-col gap-5 animate-scale-up">
            <div className="flex justify-between items-start border-b border-white/5 pb-4">
              <div className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white select-none text-xs"
                  style={{ backgroundColor: teamMembers[selectedWorkloadMember]?.color }}
                >
                  {teamMembers[selectedWorkloadMember]?.initials}
                </div>
                <div>
                  <h2 className="text-base font-bold text-white font-title">{selectedWorkloadMember}'s Ticket Board</h2>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">{teamMembers[selectedWorkloadMember]?.email}</p>
                </div>
              </div>
              
              {/* Internal metrics categories tab selector */}
              <div className="flex gap-1.5 bg-white/5 p-1 rounded-xl border border-white/5">
                {[
                  { id: 'All', label: 'All' },
                  { id: 'Active', label: 'Active' },
                  { id: 'To Fix', label: 'To Fix' },
                  { id: 'Fixed', label: 'Fixed' },
                  { id: 'Retest', label: 'Retest' },
                  { id: 'Closed', label: 'Closed' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setWorkloadFilterTab(tab.id)}
                    className={`px-3 py-1.5 text-[10px] font-bold rounded-lg uppercase tracking-wider transition-all ${
                      workloadFilterTab === tab.id 
                        ? 'bg-gradient-to-r from-[#38bdf8] to-[#22d3ee] text-black shadow' 
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* List items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-1">
              {workloadMemberBugs.length > 0 ? (
                workloadMemberBugs.map(bug => (
                  <div 
                    key={bug.id}
                    onClick={() => handleLinkToBug(bug.id)}
                    className="p-4 rounded-xl bg-white/[0.01] border border-white/5 hover:bg-white/[0.03] hover:border-white/10 transition-all cursor-pointer flex flex-col justify-between gap-3 group"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">
                          {bug.id}
                        </span>
                        <div>
                          <span className="text-xs font-bold text-slate-200 block truncate max-w-[150px]">{bug.project}</span>
                          <span className="text-[10px] text-slate-450 block truncate max-w-[150px] mt-0.5">{bug.module}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className={`badge px-1.5 py-0.5 text-[8.5px] rounded-full font-bold ${getSeverityBadgeClass(bug.severity)}`}>
                          {bug.severity}
                        </span>
                        <span className={`badge px-1.5 py-0.5 text-[9px] rounded font-bold ${getStatusBadgeClass(bug.devStatus)}`}>
                          {bug.devStatus}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-350 leading-relaxed font-medium truncate group-hover:text-slate-200 transition-colors">
                      {bug.description}
                    </p>
                    <div className="flex justify-between items-center text-[9px] text-slate-500 border-t border-white/5 pt-2 mt-1 font-bold">
                      <span>Logged: {bug.assignedDate}</span>
                      <span className="text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                        <span>Open details</span>
                        <ArrowRight size={10} />
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 py-10 text-center text-slate-500 font-bold bg-white/[0.01] border border-white/5 rounded-xl">
                  No tickets match this category in the developer's assignment queue.
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="py-16 text-center text-slate-500 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col items-center justify-center p-6">
            <Users size={30} className="text-slate-600 mb-2" />
            <h3 className="font-bold text-white font-title">Select Team Member</h3>
            <p className="text-xs text-slate-450 mt-1">Select any developer card above to explore their active workload and resolved logs.</p>
          </div>
        )}
      </section>
    </div>
  );
}

// --------------------------------
// PROJECTS VIEW COMPONENT
// --------------------------------
function ProjectsView({ bugs }) {
  // Project list
  const projectSummaries = useMemo(() => {
    const projs = [
      { name: 'Payment Gateway', desc: 'Core checkout transactions and invoice system integration.', iconBg: 'bg-red-500/10 border-red-500/20 text-red-400' },
      { name: 'Mobile App', desc: 'iOS and Android client repositories for SMS onboarding/auth.', iconBg: 'bg-blue-500/10 border-blue-500/20 text-blue-400' },
      { name: 'Web Portal', desc: 'Customer dashboard UI interface and active user analytical panels.', iconBg: 'bg-purple-500/10 border-purple-500/20 text-purple-400' },
      { name: 'Analytics Engine', desc: 'Background SQL query optimization and parser algorithms.', iconBg: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' }
    ];

    return projs.map(proj => {
      const projBugs = bugs.filter(b => b.project === proj.name);
      const total = projBugs.length;
      const active = projBugs.filter(b => b.testerStatus !== 'Closed').length;
      const critical = projBugs.filter(b => b.severity === 'Critical' && b.testerStatus !== 'Closed').length;
      const closed = projBugs.filter(b => b.testerStatus === 'Closed').length;

      return {
        ...proj,
        total,
        active,
        critical,
        closed,
        modules: PROJECT_MODULES[proj.name] || []
      };
    });
  }, [bugs]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in text-slate-300 module-bg-container">
      <div className="module-bg-overlay" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80")' }} />
      {projectSummaries.map((item, idx) => (
        <div key={idx} className="p-6 rounded-2xl glass-card flex flex-col justify-between gap-5 relative overflow-hidden group">
          <div className="flex justify-between items-start gap-4">
            <div className="flex flex-col gap-1 min-w-0">
              <span className="font-extrabold text-white text-base font-title truncate">{item.name}</span>
              <p className="text-xs text-slate-400 leading-relaxed font-semibold mt-1">{item.desc}</p>
            </div>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center border font-bold flex-shrink-0 ${item.iconBg}`}>
              {item.name[0]}
            </div>
          </div>

          {/* Module labels */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] text-slate-500 uppercase font-bold font-mono tracking-wider">Registered Modules</span>
            <div className="flex gap-2 flex-wrap">
              {item.modules.map((m, i) => (
                <span key={i} className="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-white/5 border border-white/5 text-slate-300">
                  {m}
                </span>
              ))}
            </div>
          </div>

          <div className="my-2 h-px bg-white/5" />

          {/* Metrics breakdown */}
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            <div>
              <span className="text-[9px] text-slate-500 block uppercase font-bold">Total Bugs</span>
              <span className="text-white font-extrabold block mt-0.5 font-mono">{item.total}</span>
            </div>
            <div>
              <span className="text-[9px] text-slate-500 block uppercase font-bold">Active</span>
              <span className="text-indigo-400 font-extrabold block mt-0.5 font-mono">{item.active}</span>
            </div>
            <div>
              <span className="text-[9px] text-slate-500 block uppercase font-bold text-red-400">Critical</span>
              <span className="text-red-400 font-extrabold block mt-0.5 font-mono">{item.critical}</span>
            </div>
            <div>
              <span className="text-[9px] text-slate-500 block uppercase font-bold text-emerald-400">Closed</span>
              <span className="text-emerald-400 font-extrabold block mt-0.5 font-mono">{item.closed}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// --------------------------------
// REPORTS VIEW COMPONENT
// --------------------------------
function ReportsView({ bugs, metrics }) {
  const projectDistribution = useMemo(() => {
    const projs = ['Payment Gateway', 'Mobile App', 'Web Portal', 'Analytics Engine'];
    return projs.map(p => {
      const active = bugs.filter(b => b.project === p && b.devStatus !== 'Fixed').length;
      const resolved = bugs.filter(b => b.project === p && b.devStatus === 'Fixed').length;
      const total = active + resolved;
      return { project: p, active, resolved, total };
    });
  }, [bugs]);

  const severityBreakdown = useMemo(() => {
    const sevs = ['Critical', 'High', 'Medium', 'Low'];
    return sevs.map(s => {
      const count = bugs.filter(b => b.severity === s).length;
      return { severity: s, count };
    });
  }, [bugs]);

  const resolveRate = useMemo(() => {
    const total = bugs.length;
    if (total === 0) return 0;
    const closed = bugs.filter(b => b.testerStatus === 'Closed').length;
    return Math.round((closed / total) * 100);
  }, [bugs]);

  return (
    <div className="flex flex-col gap-6 md:gap-8 animate-fade-in text-slate-300 module-bg-container">
      <div className="module-bg-overlay" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80")' }} />
      
      {/* Analytics Summary */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Resolve rate Ring gauge */}
        <div className="p-6 rounded-2xl glass-card flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-slate-450 uppercase tracking-wider">Defect Resolve Rate</span>
            <span className="text-3.5xl font-extrabold text-white font-title mt-1">{resolveRate}%</span>
            <span className="text-[10px] text-slate-500 mt-1 font-bold">Passed verification QA</span>
          </div>
          <div className="relative w-16 h-16 select-none flex-shrink-0 flex items-center justify-center">
            <svg className="w-16 h-16 transform -rotate-90">
              <circle cx="32" cy="32" r="26" className="stroke-white/5" strokeWidth="5" fill="transparent" />
              <circle 
                cx="32" 
                cy="32" 
                r="26" 
                className="stroke-indigo-500" 
                strokeWidth="5" 
                fill="transparent" 
                strokeDasharray={163.36}
                strokeDashoffset={163.36 - (163.36 * resolveRate) / 100}
                strokeLinecap="round"
                style={{ filter: 'drop-shadow(0 0 4px rgba(139, 92, 246, 0.4))' }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-extrabold font-mono text-indigo-400">{resolveRate}%</span>
          </div>
        </div>

        {/* Backlog size widget */}
        <div className="p-6 rounded-2xl glass-card flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-slate-455 uppercase tracking-wider">Backlog Defect Volume</span>
            <span className="text-3.5xl font-extrabold text-white font-title mt-1">{metrics.active}</span>
            <span className="text-[10px] text-orange-400 font-semibold mt-1">Requiring QA action</span>
          </div>
          <div className="w-11 h-11 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/5">
            <AlertCircle size={20} />
          </div>
        </div>

        {/* Avg cycle SLA widget */}
        <div className="p-6 rounded-2xl glass-card flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-slate-455 uppercase tracking-wider">Avg Resolution Cycle</span>
            <span className="text-3.5xl font-extrabold text-white font-title mt-1">1.8d</span>
            <span className="text-[10px] text-emerald-450 font-semibold mt-1">Pipeline health normal</span>
          </div>
          <div className="w-11 h-11 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/5">
            <CheckCircle2 size={20} />
          </div>
        </div>
      </section>

      {/* SVG Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Severity Bar Chart */}
        <div className="p-6 rounded-2xl glass-card flex flex-col gap-5">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-title">Severity Allocation</h3>
            <p className="text-xs text-slate-450 mt-0.5">Critical defects vs visual alerts index.</p>
          </div>

          <div className="flex-1 min-h-[220px] flex items-end justify-around border-b border-white/5 pb-4 relative mt-2">
            {severityBreakdown.map((item, idx) => {
              const maxVal = Math.max(...severityBreakdown.map(s => s.count)) || 1;
              const barHt = Math.max(15, (item.count / maxVal) * 160);

              let barColor = 'from-blue-500 to-indigo-500';
              let shadowColor = 'rgba(59,130,246,0.3)';
              if (item.severity === 'Critical') {
                barColor = 'from-red-500 to-rose-600';
                shadowColor = 'rgba(239,68,68,0.3)';
              } else if (item.severity === 'High') {
                barColor = 'from-orange-500 to-pink-500';
                shadowColor = 'rgba(249,115,22,0.3)';
              } else if (item.severity === 'Medium') {
                barColor = 'from-yellow-400 to-amber-500';
                shadowColor = 'rgba(245,158,11,0.3)';
              }

              return (
                <div key={idx} className="flex flex-col items-center gap-3 w-16 group">
                  <span className="text-[10px] font-bold text-white font-mono bg-white/5 border border-white/5 px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.count}
                  </span>
                  <div 
                    className={`w-9 bg-gradient-to-t ${barColor} rounded-t-lg transition-all duration-500`}
                    style={{ height: `${barHt}px`, filter: `drop-shadow(0 0 6px ${shadowColor})` }}
                  />
                  <span className="text-[10px] font-bold text-slate-500 uppercase mt-1 tracking-wider">{item.severity}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Project workloads distribution list */}
        <div className="p-6 rounded-2xl glass-card flex flex-col gap-5">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-title">Workspace Defect Load</h3>
            <p className="text-xs text-slate-450 mt-0.5">Resolved vs unresolved active volume.</p>
          </div>

          <div className="flex flex-col gap-4 mt-2">
            {projectDistribution.map((item, idx) => {
              const rate = item.total === 0 ? 0 : Math.round((item.resolved / item.total) * 100);
              return (
                <div key={idx} className="flex flex-col gap-1.5 text-xs">
                  <div className="flex justify-between items-center text-slate-400 font-medium">
                    <span className="font-bold text-slate-200">{item.project}</span>
                    <span className="font-mono">
                      {item.resolved} fixed / {item.total} total <span className="text-indigo-400 ml-2 font-bold">{rate}%</span>
                    </span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500" style={{ width: `${rate}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

// --------------------------------
// SETTINGS VIEW COMPONENT
// --------------------------------
function SettingsView({ user, setUser, triggerToast }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [activeSubTab, setActiveSubTab] = useState('Profile');
  
  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUser({
      ...user,
      name,
      email,
      initials: name.charAt(0)
    });
    triggerToast('Profile updated successfully in Vera context!');
  };

  return (
    <div className="max-w-4xl mx-auto w-full animate-fade-in flex flex-col gap-6 text-[#475569] module-bg-container">
      <div className="module-bg-overlay" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80")' }} />
      <div className="border-b border-[#BFDBFE]/60 pb-4">
        <h2 className="text-lg font-bold text-[#0F172A] font-title">Preferences</h2>
        <p className="text-xs text-[#475569] mt-1">Configure workspace API profiles, token registers, and alerts thresholds.</p>
      </div>

      {/* Sub tabs list */}
      <section className="flex gap-2 border-b border-[#BFDBFE]/60 pb-px text-xs font-bold uppercase tracking-wider font-title">
        {['Profile', 'Workspace', 'Alerts', 'Security'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveSubTab(tab)}
            className={`px-5 py-2.5 transition-all border-b-2 -mb-px ${
              activeSubTab === tab 
                ? 'border-[#38BDF8] text-[#38BDF8]' 
                : 'border-transparent text-[#475569] hover:text-[#0F172A]'
            }`}
          >
            {tab}
          </button>
        ))}
      </section>

      {/* Action panel workspace */}
      <section className="mt-4">
        {activeSubTab === 'Profile' && (
          <form onSubmit={handleSaveProfile} className="flex flex-col gap-5 max-w-lg">
            <div className="flex items-center gap-4 pb-2">
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt={name} className="w-14 h-14 rounded-xl object-cover border border-[#BFDBFE] shadow-sm" />
              ) : (
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center font-bold text-white text-lg select-none shadow-sm"
                  style={{ backgroundColor: user.avatarColor }}
                >
                  {user.initials}
                </div>
              )}
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-bold text-[#0F172A] font-title">{name}</span>
                <span className="text-[9px] text-[#38BDF8] bg-[#E0F2FE] border border-[#BFDBFE]/65 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider font-mono">{user.role}</span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#475569] pl-1">Full Display Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11 px-4 rounded-xl bg-white border border-[#BFDBFE] text-[#0F172A] text-xs outline-none focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20 transition-all"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#475569] pl-1">API Mail Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 px-4 rounded-xl bg-white border border-[#BFDBFE] text-[#0F172A] text-xs outline-none focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20 transition-all"
                required
              />
            </div>

            <div className="pt-2">
              <button 
                type="submit" 
                className="h-11 px-7 rounded-xl bg-gradient-to-r from-[#38BDF8] to-[#7DD3FC] text-[#0F172A] font-bold hover:brightness-110 shadow-lg shadow-sky-400/20 transition-all text-xs"
              >
                Save Profile Configuration
              </button>
            </div>
          </form>
        )}

        {activeSubTab === 'Workspace' && (
          <div className="flex flex-col gap-5 max-w-lg">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#475569] pl-1">Organization Tenant</label>
              <input 
                type="text" 
                defaultValue="QA MIND Systems Ltd"
                disabled
                className="h-11 px-4 rounded-xl bg-slate-50 border border-[#BFDBFE] text-[#94A3B8] text-xs cursor-not-allowed"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#475569] pl-1">Workspace Tenant ID</label>
              <input 
                type="text" 
                defaultValue="qamind.io/global-production-workspace-node-1"
                disabled
                className="h-11 px-4 rounded-xl bg-slate-50 border border-[#BFDBFE] text-[#94A3B8] text-xs cursor-not-allowed"
              />
            </div>
            <p className="text-[#94A3B8] text-[10px] italic">* Global variables locks administered via tenant config controls.</p>
          </div>
        )}

        {activeSubTab === 'Alerts' && (
          <div className="flex flex-col gap-4 max-w-lg bg-white p-5 rounded-2xl border border-[#BFDBFE] shadow-sm">
            <h3 className="text-xs font-bold text-[#0F172A] font-title mb-2 uppercase tracking-wider">Alert Notification Thresholds</h3>
            
            <div className="flex items-center justify-between py-2 border-b border-[#BFDBFE]/50">
              <div>
                <span className="text-xs font-semibold text-[#0F172A] block">Immediate Hotfix Toast Alerts</span>
                <span className="text-[10px] text-[#94A3B8] block mt-0.5">Display UI notification immediately when P1 bug is reported.</span>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#38BDF8] text-white border border-[#BFDBFE] rounded focus:ring-0 cursor-pointer" />
            </div>

            <div className="flex items-center justify-between py-2 border-b border-[#BFDBFE]/50">
              <div>
                <span className="text-xs font-semibold text-[#0F172A] block">Defect Assigned Email Notifications</span>
                <span className="text-[10px] text-[#94A3B8] block mt-0.5">Send a workspace mail check digest to developer instantly.</span>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#38BDF8] text-white border border-[#BFDBFE] rounded focus:ring-0 cursor-pointer" />
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <span className="text-xs font-semibold text-[#0F172A] block">Weekly Sprint Velocity Summaries</span>
                <span className="text-[10px] text-[#94A3B8] block mt-0.5">Compile resolution stats to email digest.</span>
              </div>
              <input type="checkbox" className="w-4 h-4 accent-[#38BDF8] text-white border border-[#BFDBFE] rounded focus:ring-0 cursor-pointer" />
            </div>
          </div>
        )}

        {activeSubTab === 'Security' && (
          <div className="flex flex-col gap-5 max-w-lg">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#475569] pl-1">QA MIND API Integration Token Key</label>
              <div className="flex gap-2">
                <input 
                  type="password" 
                  defaultValue="••••••••••••••••••••••••••••••••••••"
                  disabled
                  className="flex-1 h-11 px-4 rounded-xl bg-slate-50 border border-[#BFDBFE] text-[#94A3B8] text-xs cursor-not-allowed font-mono"
                />
                <button 
                  type="button" 
                  onClick={() => triggerToast('Security Integration Client Key copied!')}
                  className="h-11 px-4 rounded-xl border border-[#BFDBFE] bg-white text-[#475569] hover:bg-[#E0F2FE]/50 hover:text-[#0F172A] transition-all text-xs font-bold"
                >
                  Copy Key
                </button>
              </div>
            </div>
            <p className="text-[#94A3B8] text-[10px] leading-relaxed">
              API integration token provides full read/write programmatic REST integration scopes to client JIRA synchronization portals. Keep credentials secure.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

// --------------------------------
// CREATE BUG VIEW COMPONENT (INLINE TAB)
// --------------------------------
function CreateBugView({
  formProject,
  setFormProject,
  formModule,
  setFormModule,
  formSubModule,
  setFormSubModule,
  formAssignedTo,
  setFormAssignedTo,
  formPriority,
  setFormPriority,
  formSeverity,
  setFormSeverity,
  formDescription,
  setFormDescription,
  onSubmit,
  onClear,
  PROJECT_MODULES,
  MODULE_SUBMODULES
}) {
  return (
    <div className="max-w-2xl mx-auto w-full animate-fade-in text-[#475569] module-bg-container">
      <div className="module-bg-overlay" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80")' }} />
      <div className="border-b border-[#BFDBFE]/60 pb-4 mb-6">
        <h2 className="text-xl font-extrabold text-[#0F172A] font-title">Create New Defect</h2>
        <p className="text-xs text-[#475569] mt-1">Register high-fidelity QA bug details into active developer queues.</p>
      </div>

      <form 
        onSubmit={onSubmit}
        className="glass-card rounded-3xl p-8 flex flex-col gap-6"
      >
        {/* Form grid info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Project Selection */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#475569] pl-1">Project Workspace</label>
            <select 
              value={formProject}
              onChange={(e) => {
                const proj = e.target.value;
                setFormProject(proj);
                const avMods = PROJECT_MODULES[proj] || [];
                if (avMods.length > 0) {
                  setFormModule(avMods[0]);
                  const avSubs = MODULE_SUBMODULES[avMods[0]] || [];
                  setFormSubModule(avSubs[0] || '');
                }
              }}
              className="h-11 px-4 rounded-xl bg-white border border-[#BFDBFE] text-xs text-[#0F172A] cursor-pointer focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20 outline-none transition-colors"
            >
              <option value="Payment Gateway" className="bg-white">Payment Gateway</option>
              <option value="Mobile App" className="bg-white">Mobile App</option>
              <option value="Web Portal" className="bg-white">Web Portal</option>
              <option value="Analytics Engine" className="bg-white">Analytics Engine</option>
            </select>
          </div>

          {/* Module selection */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#475569] pl-1">Target Module</label>
            <select 
              value={formModule}
              onChange={(e) => {
                const mod = e.target.value;
                setFormModule(mod);
                const avSubs = MODULE_SUBMODULES[mod] || [];
                setFormSubModule(avSubs[0] || '');
              }}
              className="h-11 px-4 rounded-xl bg-white border border-[#BFDBFE] text-xs text-[#0F172A] cursor-pointer focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20 outline-none transition-colors"
            >
              {PROJECT_MODULES[formProject]?.map(mod => (
                <option key={mod} value={mod} className="bg-white">{mod}</option>
              ))}
            </select>
          </div>

          {/* Sub-module */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#475569] pl-1">Sub Module Sub-system</label>
            <select 
              value={formSubModule}
              onChange={(e) => setFormSubModule(e.target.value)}
              className="h-11 px-4 rounded-xl bg-white border border-[#BFDBFE] text-xs text-[#0F172A] cursor-pointer focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20 outline-none transition-colors"
            >
              {MODULE_SUBMODULES[formModule]?.map(sub => (
                <option key={sub} value={sub} className="bg-white">{sub}</option>
              ))}
            </select>
          </div>

          {/* Developer assignment */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#475569] pl-1">Assign Developer</label>
            <select 
              value={formAssignedTo}
              onChange={(e) => setFormAssignedTo(e.target.value)}
              className="h-11 px-4 rounded-xl bg-white border border-[#BFDBFE] text-xs text-[#0F172A] cursor-pointer focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20 outline-none transition-colors"
            >
              <option value="Rahul Verma" className="bg-white">Rahul Verma (Senior Dev)</option>
              <option value="Arun Kumar" className="bg-white">Arun Kumar (Full Stack)</option>
              <option value="Dev Nair" className="bg-white">Dev Nair (Backend Dev)</option>
              <option value="Priya Sharma" className="bg-white">Priya Sharma (QA Lead)</option>
            </select>
          </div>

          {/* Priority */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#475569] pl-1">Queue Priority</label>
            <select 
              value={formPriority}
              onChange={(e) => setFormPriority(e.target.value)}
              className="h-11 px-4 rounded-xl bg-white border border-[#BFDBFE] text-xs text-[#0F172A] cursor-pointer focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20 outline-none transition-colors"
            >
              <option value="P1" className="bg-white">P1 - Critical Hotfix</option>
              <option value="P2" className="bg-white">P2 - High Priority</option>
              <option value="P3" className="bg-white">P3 - Medium Priority</option>
              <option value="P4" className="bg-white">P4 - Low Priority</option>
            </select>
          </div>

          {/* Severity */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#475569] pl-1">Technical Severity</label>
            <select 
              value={formSeverity}
              onChange={(e) => setFormSeverity(e.target.value)}
              className="h-11 px-4 rounded-xl bg-white border border-[#BFDBFE] text-xs text-[#0F172A] cursor-pointer focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20 outline-none transition-colors"
            >
              <option value="Critical" className="bg-white">Critical (System Crash/Security)</option>
              <option value="High" className="bg-white">High (Core Flow Broken)</option>
              <option value="Medium" className="bg-white">Medium (Feature Bug)</option>
              <option value="Low" className="bg-white">Low (Visual/UX issue)</option>
            </select>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label className="text-xs font-semibold text-[#475569] pl-1">Description / Reproduction Steps</label>
            <textarea 
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              placeholder="Provide detailed description, actual vs expected results, and environment coordinates..."
              className="w-full min-h-[120px] max-h-[220px] p-4 text-xs rounded-xl bg-white border border-[#BFDBFE] text-[#0F172A] placeholder-[#94A3B8] focus:bg-white focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20 outline-none resize-y transition-colors"
              required
            />
          </div>

          {/* Mock Upload attachments zone */}
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label className="text-xs font-semibold text-[#475569] pl-1">Attachments (Screenshots / Logs)</label>
            <div className="border-2 border-dashed border-[#BFDBFE] hover:border-[#38BDF8] bg-[#F8FBFF] hover:bg-[#E0F2FE]/30 rounded-xl p-6 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-[#E0F2FE] flex items-center justify-center text-[#38BDF8] group-hover:scale-110 transition-transform">
                <PlusCircle size={20} />
              </div>
              <div className="text-center">
                <span className="text-xs font-bold text-[#0F172A] block">Drag & drop files here, or <span className="text-[#38BDF8] underline">browse</span></span>
                <span className="text-[10px] text-[#94A3B8] block mt-1">Supports PNG, JPG, GIF, PDF, TXT, LOG up to 10MB</span>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4 border-t border-[#BFDBFE]/60 justify-end mt-2">
          <button 
            type="button"
            onClick={onClear}
            className="h-11 px-5 rounded-xl text-[#475569] font-bold border border-[#BFDBFE] hover:bg-[#E0F2FE]/50 hover:text-[#0F172A] transition-all text-xs bg-white"
          >
            Clear Form
          </button>
          <button 
            type="submit"
            className="h-11 px-7 rounded-xl bg-gradient-to-r from-[#38BDF8] to-[#7DD3FC] text-[#0F172A] font-bold hover:brightness-110 shadow-lg shadow-sky-400/20 hover:shadow-sky-400/35 transition-all text-xs"
          >
            Submit Bug Report
          </button>
        </div>
      </form>
    </div>
  );
}

