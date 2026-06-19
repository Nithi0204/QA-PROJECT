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
  ChevronLeft,
  RefreshCw,
  Terminal,
  MoreVertical,
  ArrowRight,
  CheckSquare,
  Folder,
  TrendingUp,
  FileText,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Code,
  Bug,
  Sparkles,
  UploadCloud
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
    title: 'UPI transactions failing during high latency peaks',
    description: 'UPI transactions failing on Android devices during high network latency peaks. Returns null transaction ID from vendor API.',
    priority: 'P1',
    severity: 'Critical',
    assignedTo: 'Rahul Verma',
    assignedBy: 'Priya Sharma',
    assignedDate: 'Jun 3, 2026',
    devStatus: 'In Progress',
    testerStatus: 'Assigned',
    updatedTime: '10 min ago',
    screenshotUrl: 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?w=600',
    comments: [
      { author: 'Priya Sharma', text: 'Reproduced on real device testing. Occurs 3 out of 10 times.', date: 'Jun 3, 2026' }
    ]
  },
  {
    id: 'BUG-124',
    project: 'Payment Gateway',
    module: 'Billing',
    subModule: 'Credit Card',
    title: 'Subscription billing system charging customers 24h early',
    description: 'Subscription billing system charging customers 24 hours prior to actual cycle end date.',
    priority: 'P2',
    severity: 'High',
    assignedTo: 'Arun Kumar',
    assignedBy: 'Priya Sharma',
    assignedDate: 'Jun 4, 2026',
    devStatus: 'Fixed',
    testerStatus: 'Retesting',
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
    title: 'Resend OTP button remains disabled after cooldown timer',
    description: 'Resend OTP button remains disabled after the 65-second cooldown timer expires.',
    priority: 'P3',
    severity: 'Medium',
    assignedTo: 'Rahul Verma',
    assignedBy: 'Sneha Patel',
    assignedDate: 'Jun 4, 2026',
    devStatus: 'Open',
    testerStatus: 'Assigned',
    updatedTime: '2 hr ago',
    comments: []
  },
  {
    id: 'BUG-122',
    project: 'Web Portal',
    module: 'Dashboard',
    subModule: 'Analytics Charts',
    title: 'Line graph renders with overlapping X-axis labels',
    description: 'Line graph renders with overlapping X-axis labels when device orientation changes to landscape.',
    priority: 'P4',
    severity: 'Low',
    assignedTo: 'Priya Sharma',
    assignedBy: 'Sneha Patel',
    assignedDate: 'Jun 5, 2026',
    devStatus: 'Fixed',
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
    title: 'Avatar upload fails when image dimensions exceed 1000px',
    description: 'User avatar upload fails when image dimensions exceed 1000px width/height, despite size being under 1MB.',
    priority: 'P2',
    severity: 'High',
    assignedTo: 'Arun Kumar',
    assignedBy: 'Priya Sharma',
    assignedDate: 'Jun 5, 2026',
    devStatus: 'Open',
    testerStatus: 'Assigned',
    updatedTime: '4 hr ago',
    comments: []
  },
  {
    id: 'BUG-120',
    project: 'Payment Gateway',
    module: 'Checkout',
    subModule: 'Credit Card',
    title: 'Checkout page crashes on iOS Safari card verification failure',
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
    title: 'Dark mode settings toggle resets upon terminating the app',
    description: 'Dark mode settings toggle resets to default light mode upon terminating the app memory container.',
    priority: 'P3',
    severity: 'Medium',
    assignedTo: 'Rahul Verma',
    assignedBy: 'Sneha Patel',
    assignedDate: 'May 30, 2026',
    devStatus: 'In Progress',
    testerStatus: 'Assigned',
    updatedTime: '6 hr ago',
    comments: []
  },
  {
    id: 'BUG-118',
    project: 'Web Portal',
    module: 'Dashboard',
    subModule: 'Analytics Charts',
    title: 'Data fetch timeout occurs when query range exceeds 30 days',
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
    title: 'OTP autofill fails to capture SMS tokens on Android API 33',
    description: 'OTP autofill fails to capture SMS tokens on Android devices running API level 33.',
    priority: 'P2',
    severity: 'High',
    assignedTo: 'Arun Kumar',
    assignedBy: 'Priya Sharma',
    assignedDate: 'Jun 2, 2026',
    devStatus: 'Fixed',
    testerStatus: 'Retesting',
    updatedTime: '1 day ago',
    comments: []
  },
  {
    id: 'BUG-116',
    project: 'Payment Gateway',
    module: 'Billing',
    subModule: 'Subscription Billing',
    title: 'Invoice PDFs fail to generate, rendering syntax errors',
    description: 'Invoice PDFs fail to generate, throwing background rendering syntax errors.',
    priority: 'P2',
    severity: 'High',
    assignedTo: 'Arun Kumar',
    assignedBy: 'Sneha Patel',
    assignedDate: 'Jun 3, 2026',
    devStatus: 'Open',
    testerStatus: 'Assigned',
    updatedTime: '2 days ago',
    comments: []
  },
  {
    id: 'BUG-115',
    project: 'Web Portal',
    module: 'Dashboard',
    subModule: 'Analytics Charts',
    title: 'Hover tooltips display incorrect coordinates in light mode',
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
    title: 'WebSocket disconnect retry loops lock up active users counter',
    description: 'Real-time active users counter locks up during WebSocket disconnect retry loops.',
    priority: 'P1',
    severity: 'Critical',
    assignedTo: 'Dev Nair',
    assignedBy: 'Priya Sharma',
    assignedDate: 'Jun 4, 2026',
    devStatus: 'Open',
    testerStatus: 'Assigned',
    updatedTime: '3 days ago',
    comments: []
  },
  {
    id: 'BUG-113',
    project: 'Analytics Engine',
    module: 'Query Parser',
    subModule: 'SQL Optimizer',
    title: 'Database joins on nested queries take longer than 3.5s',
    description: 'Database joins on nested queries take longer than 3.5 seconds, stalling background threads.',
    priority: 'P2',
    severity: 'High',
    assignedTo: 'Dev Nair',
    assignedBy: 'Sneha Patel',
    assignedDate: 'Jun 4, 2026',
    devStatus: 'In Progress',
    testerStatus: 'Assigned',
    updatedTime: '3 days ago',
    comments: []
  },
  {
    id: 'BUG-112',
    project: 'Payment Gateway',
    module: 'Billing',
    subModule: 'Subscription Billing',
    title: 'Webhook verification returns 401 signature mismatches',
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
    title: 'Country code select dropdown displays empty results',
    description: 'Country code select dropdown displays empty results when locale is set to US.',
    priority: 'P3',
    severity: 'Medium',
    assignedTo: 'Priya Sharma',
    assignedBy: 'Sneha Patel',
    assignedDate: 'Jun 3, 2026',
    devStatus: 'Open',
    testerStatus: 'Assigned',
    updatedTime: '4 days ago',
    comments: []
  },
  {
    id: 'BUG-110',
    project: 'Payment Gateway',
    module: 'Checkout',
    subModule: 'UPI Payment',
    title: 'Auto-retry checkout attempts lock user balances',
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
    status: 'Reassigned',
    avatarType: 'sync'
  },
  {
    id: 4,
    user: 'Sneha Patel',
    action: 'marked bug as closed',
    bugId: 'BUG-122',
    timestamp: '2.5 hr ago',
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

const INITIAL_PROJECTS = [
  { name: 'Payment Gateway', desc: 'Core checkout transactions and invoice system integration.', iconBg: 'bg-red-500/10 border-red-500/20 text-red-400' },
  { name: 'Mobile App', desc: 'iOS and Android client repositories for SMS onboarding/auth.', iconBg: 'bg-blue-500/10 border-blue-500/20 text-blue-400' },
  { name: 'Web Portal', desc: 'Customer dashboard UI interface and active user analytical panels.', iconBg: 'bg-purple-500/10 border-purple-500/20 text-purple-400' },
  { name: 'Analytics Engine', desc: 'Background SQL query optimization and parser algorithms.', iconBg: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' }
];

export default function App() {
  // App Session State
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [bugs, setBugs] = useState(INITIAL_BUGS);
  const [activities, setActivities] = useState(INITIAL_ACTIVITIES);
  const [teamMembers, setTeamMembers] = useState(TEAM_MEMBERS);

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
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formPriority, setFormPriority] = useState('Medium');
  const [formSeverity, setFormSeverity] = useState('Major');
  const [formAssignedTo, setFormAssignedTo] = useState('');
  const [formRemarks, setFormRemarks] = useState('');
  const [formScreenshot, setFormScreenshot] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const [projectModules, setProjectModules] = useState(PROJECT_MODULES);
  const [moduleSubmodules, setModuleSubmodules] = useState(MODULE_SUBMODULES);
  const [projectsList, setProjectsList] = useState(INITIAL_PROJECTS);

  // Projects View Navigation States (lifted from ProjectsView)
  const [projectTabProject, setProjectTabProject] = useState(null);
  const [projectTabModule, setProjectTabModule] = useState(null);
  const [projectTabSubModule, setProjectTabSubModule] = useState(null);

  // Dynamic Project Registration Handler
  const handleAddProject = (projectName, moduleName, submoduleName) => {
    const pName = projectName.trim();
    const mName = moduleName.trim();
    const sName = submoduleName.trim();

    if (!pName || !mName) {
      alert("Project and Module fields are required.");
      return;
    }

    setProjectModules(prev => {
      const existingModules = prev[pName] || [];
      if (!existingModules.includes(mName)) {
        return {
          ...prev,
          [pName]: [...existingModules, mName]
        };
      }
      return prev;
    });

    setModuleSubmodules(prev => {
      const existingSubs = prev[mName] || [];
      if (sName && !existingSubs.includes(sName)) {
        return {
          ...prev,
          [mName]: [...existingSubs, sName]
        };
      } else if (!prev[mName]) {
        return {
          ...prev,
          [mName]: []
        };
      }
      return prev;
    });

    setProjectsList(prev => {
      if (!prev.some(p => p.name.toLowerCase() === pName.toLowerCase())) {
        const colors = [
          'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
          'bg-pink-500/10 border-pink-500/20 text-pink-400',
          'bg-indigo-500/10 border-indigo-500/20 text-indigo-400',
          'bg-amber-500/10 border-amber-500/20 text-amber-400'
        ];
        const color = colors[prev.length % colors.length];
        return [
          ...prev,
          {
            name: pName,
            desc: `Custom registered project for active workspace QA monitoring.`,
            iconBg: color
          }
        ];
      }
      return prev;
    });

    // Automatically select the newly created Project/Module/Sub Module in the form
    setFormProject(pName);
    setFormModule(mName);
    setFormSubModule(sName || '');

    triggerToast(`Successfully registered project "${pName}"!`);
  };

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
    const baseBugs = user && user.userRole === 'Developer' ? bugs.filter(b => b.assignedTo === user.name) : bugs;
    return baseBugs.filter(bug => {
      const matchProj = selectedProject === 'All' || bug.project === selectedProject;
      const matchMod = selectedModule === 'All' || bug.module === selectedModule;
      const matchSub = selectedSubModule === 'All' || bug.subModule === selectedSubModule;
      return matchProj && matchMod && matchSub;
    });
  }, [bugs, selectedProject, selectedModule, selectedSubModule, user]);

  // Dynamic Metrics derived from current database count
  const metrics = useMemo(() => {
    if (user && user.userRole === 'Developer') {
      const myBugs = bugs.filter(b => b.assignedTo === user.name);
      return {
        open: myBugs.filter(b => b.devStatus === 'Open').length,
        inProgress: myBugs.filter(b => b.devStatus === 'In Progress').length,
        fixed: myBugs.filter(b => b.devStatus === 'Fixed').length,
        critical: myBugs.filter(b => b.assignedTo === user.name && (b.severity === 'Critical' || b.severity === 'Blocker') && b.testerStatus !== 'Closed').length
      };
    }
    const activeBugsCount = bugs.filter(b => b.testerStatus !== 'Closed').length;
    const retestBugsCount = bugs.filter(b => b.testerStatus === 'Retesting').length;
    const toFixCount = bugs.filter(b => b.devStatus === 'Open' || b.devStatus === 'In Progress').length;
    const closedCount = bugs.filter(b => b.testerStatus === 'Closed').length;

    return {
      active: activeBugsCount,
      retest: retestBugsCount,
      toFix: toFixCount,
      closed: closedCount
    };
  }, [bugs, user]);

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
        role: teamMembers[name]?.role || 'Developer',
        active: Math.max(0, base.active + offsetActive),
        toFix: Math.max(0, base.toFix + offsetToFix),
        fixed: Math.max(0, base.fixed + offsetFixed),
        retest: Math.max(0, base.retest + offsetRetest),
        closed: Math.max(0, base.closed + offsetClosed),
        max: 20
      };
    });
  }, [bugs, teamMembers]);

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
  const handleLogin = (email, password, username, fullName, selectedRole) => {
    let matchedName = fullName ? fullName.trim() : (username ? username.trim() : '');
    let matchedEmail = email || 'priya@qamind.io';

    if (!matchedName) {
      matchedName = 'Priya Sharma';
      const normalizedEmail = matchedEmail.toLowerCase();
      if (normalizedEmail.includes('rahul')) matchedName = 'Rahul Verma';
      else if (normalizedEmail.includes('arun')) matchedName = 'Arun Kumar';
      else if (normalizedEmail.includes('dev')) matchedName = 'Dev Nair';
      else if (normalizedEmail.includes('sneha')) matchedName = 'Sneha Patel';
    }

    const baseRole = teamMembers[matchedName]?.role || (selectedRole === 'Developer' ? 'Software Developer' : 'QA Engineer');
    const userRole = selectedRole || (baseRole.toLowerCase().includes('dev') || baseRole.toLowerCase().includes('full stack') ? 'Developer' : 'QA Engineer');

    const loginUser = {
      username: username ? username.trim() : matchedName.toLowerCase().replace(/\s/g, ''),
      name: matchedName,
      email: matchedEmail,
      role: baseRole,
      userRole: userRole,
      avatarColor: teamMembers[matchedName]?.color || '#8b5cf6',
      initials: teamMembers[matchedName] ? teamMembers[matchedName].initials : matchedName.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase(),
      avatarUrl: teamMembers[matchedName]?.avatarUrl || null
    };

    // Dynamically register logged in user into the teamMembers list
    setTeamMembers(prev => {
      if (prev[matchedName]) return prev;
      return {
        ...prev,
        [matchedName]: {
          initials: loginUser.initials,
          color: loginUser.avatarColor,
          email: loginUser.email,
          role: loginUser.role,
          username: loginUser.username,
          avatarUrl: loginUser.avatarUrl
        }
      };
    });

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
    if (!formTitle.trim() || !formDescription.trim() || !formAssignedTo.trim()) {
      alert('please fill the mandatory fields');
      return;
    }

    const nextIdNumber = bugs.reduce((acc, curr) => {
      const num = parseInt(curr.id.split('-')[1]);
      return num > acc ? num : acc;
    }, 125) + 1;

    const initialComments = [];
    if (formRemarks.trim()) {
      initialComments.push({
        author: user.name,
        text: `Initial Remarks: ${formRemarks.trim()}`,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      });
    }

    const newBug = {
      id: `BUG-${nextIdNumber}`,
      project: formProject,
      module: formModule,
      subModule: formSubModule,
      title: formTitle.trim(),
      description: formDescription.trim(),
      priority: formPriority,
      severity: formSeverity,
      assignedTo: formAssignedTo.trim(),
      assignedBy: user.username || user.name,
      assignedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      remarks: formRemarks.trim(),
      screenshotUrl: previewUrl || null,
      devStatus: 'Open',
      testerStatus: 'Open',
      updatedTime: 'Just now',
      comments: initialComments
    };

    setBugs([newBug, ...bugs]);
    
    // Add to Live Activities
    const newActivity = {
      id: Date.now(),
      user: user.name,
      action: `created bug report "${newBug.title}"`,
      bugId: newBug.id,
      timestamp: 'Just now',
      status: 'Open',
      avatarType: 'bug'
    };
    setActivities([newActivity, ...activities]);

    // Clear form & redirect
    handleClearForm();
    setActiveTab('Dashboard');
    triggerToast(`Successfully registered defect ${newBug.id}!`);
  };

  // Clear bug form
  const handleClearForm = () => {
    setFormTitle('');
    setFormDescription('');
    setFormPriority('Medium');
    setFormSeverity('Major');
    setFormAssignedTo('');
    setFormRemarks('');
    setFormScreenshot(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl('');
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

  // Visual severity class configurations matching light theme
  const getSeverityBadgeClass = (severity) => {
    switch(severity) {
      case 'Blocker': return 'bg-[#FEE2E2] text-[#991B1B] border border-[#FECACA] rounded-full shadow-[0_2px_8px_rgba(153,27,27,0.06)] font-bold uppercase tracking-wider';
      case 'Critical': return 'bg-[#FED7AA] text-[#C2410C] border border-[#FDBA74] rounded-full';
      case 'Major': return 'bg-[#FECACA] text-[#DC2626] border border-[#FCA5A5] rounded-full';
      case 'Minor': return 'bg-[#FEF9C3] text-[#CA8A04] border border-[#FEF08A] rounded-full';
      // Legacy compatibility mappings
      case 'High': return 'bg-[#FECACA] text-[#DC2626] border border-[#FCA5A5] rounded-full';
      case 'Medium': return 'bg-[#DBEAFE] text-[#2563EB] border border-[#BFDBFE] rounded-full';
      case 'Low': return 'bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0] rounded-full';
      default: return 'bg-slate-100 text-slate-600 border border-slate-200 rounded-full';
    }
  };

  const getPriorityBadgeClass = (priority) => {
    switch(priority) {
      case 'High': case 'P1': return 'bg-[#FCE7F3] text-[#DB2777] border border-[#FBCFE8] rounded-full';
      case 'Medium': case 'P2': return 'bg-[#DBEAFE] text-[#2563EB] border border-[#BFDBFE] rounded-full';
      case 'Low': case 'P3': case 'P4': return 'bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0] rounded-full';
      default: return 'bg-slate-100 text-slate-600 border border-slate-200 rounded-full';
    }
  };

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'Open': return 'bg-purple-50 text-purple-600 border border-purple-200';
      case 'In Progress': return 'bg-blue-50 text-blue-600 border border-blue-200';
      case 'Fixed': return 'bg-emerald-50 text-emerald-600 border border-emerald-200';
      case 'Retest': return 'bg-orange-50 text-orange-600 border border-orange-200';
      case 'Closed': return 'bg-slate-100 text-slate-600 border border-slate-200';
      default: return 'bg-slate-100 text-slate-600 border border-slate-200';
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
      
      {/* Grid of Dots for Dashboard Background */}
      <div className="absolute top-[8%] left-[20%] grid grid-cols-6 gap-2.5 opacity-[0.3] pointer-events-none z-0">
        {[...Array(24)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
        ))}
      </div>
      <div className="absolute bottom-[12%] right-[5%] grid grid-cols-6 gap-2.5 opacity-[0.3] pointer-events-none z-0">
        {[...Array(24)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
        ))}
      </div>
      <div className="absolute top-[50%] left-[50%] grid grid-cols-4 gap-2.5 opacity-[0.2] pointer-events-none z-0">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
        ))}
      </div>

      {/* Floating bright background outline tech icons spread across the entire dashboard pages */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        {/* Left side behind sidebar and left workspace area */}
        <Terminal className="absolute top-[6%] left-[4%] text-[#38BDF8] ambient-bg-icon rotate-[-5deg] w-9 h-9" />
        <Code className="absolute top-[12%] left-[12%] text-[#0072FF] ambient-bg-icon rotate-[15deg] w-9 h-9" />
        <Shield className="absolute top-[28%] left-[2%] text-[#38BDF8] ambient-bg-icon rotate-[-10deg] w-8 h-8" />
        <Bug className="absolute top-[40%] left-[14%] text-[#38BDF8] ambient-bg-icon rotate-[20deg] w-9 h-9" />
        <Sliders className="absolute top-[62%] left-[3%] text-[#0072FF] ambient-bg-icon rotate-[-12deg] w-8 h-8" />
        <MessageSquare className="absolute top-[78%] left-[10%] text-[#38BDF8] ambient-bg-icon rotate-[18deg] w-9 h-9" />

        {/* Center / Workspace area */}
        <Code className="absolute top-[10%] left-[28%] text-[#38BDF8] ambient-bg-icon rotate-[12deg] w-10 h-10" />
        <Search className="absolute top-[24%] left-[22%] text-[#0072FF] ambient-bg-icon rotate-[-8deg] w-8 h-8" />
        <CheckSquare className="absolute top-[32%] left-[35%] text-[#38BDF8] ambient-bg-icon rotate-[15deg] w-9 h-9" />
        <Calendar className="absolute top-[48%] left-[18%] text-[#38BDF8] ambient-bg-icon rotate-[8deg] w-9 h-9" />
        <Sliders className="absolute top-[54%] left-[30%] text-[#0072FF] ambient-bg-icon rotate-[-15deg] w-8 h-8" />
        <Briefcase className="absolute top-[68%] left-[26%] text-[#38BDF8] ambient-bg-icon rotate-[5deg] w-9 h-9" />
        <AlertCircle className="absolute top-[80%] left-[21%] text-[#0072FF] ambient-bg-icon rotate-[-10deg] w-9 h-9" />
        <SettingsIcon className="absolute top-[88%] left-[32%] text-[#38BDF8] ambient-bg-icon rotate-[18deg] w-9 h-9" />

        {/* Middle and Right side behind main content blocks */}
        <Terminal className="absolute top-[60%] left-[45%] text-[#38BDF8] ambient-bg-icon rotate-[10deg] w-9 h-9" />
        <Bug className="absolute top-[88%] left-[48%] text-[#0072FF] ambient-bg-icon rotate-[-15deg] w-9 h-9" />
        <Sliders className="absolute top-[4%] left-[54%] text-[#38BDF8] ambient-bg-icon rotate-[-10deg] w-9 h-9" />
        <Code className="absolute top-[16%] left-[64%] text-[#0072FF] ambient-bg-icon rotate-[25deg] w-10 h-10" />
        <MessageSquare className="absolute top-[32%] left-[50%] text-[#38BDF8] ambient-bg-icon rotate-[-12deg] w-9 h-9" />
        <CheckSquare className="absolute top-[42%] left-[72%] text-[#0072FF] ambient-bg-icon rotate-[8deg] w-9 h-9" />
        <Calendar className="absolute top-[58%] left-[62%] text-[#38BDF8] ambient-bg-icon rotate-[-15deg] w-9 h-9" />
        <Bug className="absolute top-[70%] left-[80%] text-[#0072FF] ambient-bg-icon rotate-[20deg] w-8 h-8" />
        <FileText className="absolute top-[84%] left-[66%] text-[#38BDF8] ambient-bg-icon rotate-[5deg] w-9 h-9" />
        <Briefcase className="absolute top-[82%] left-[85%] text-[#38BDF8] ambient-bg-icon rotate-[-8deg] w-9 h-9" />
        <AlertCircle className="absolute top-[92%] left-[75%] text-[#0072FF] ambient-bg-icon rotate-[15deg] w-9 h-9" />
        
        {/* Far Right Area */}
        <Search className="absolute top-[8%] left-[84%] text-[#38BDF8] ambient-bg-icon rotate-[12deg] w-9 h-9" />
        <Shield className="absolute top-[26%] left-[92%] text-[#0072FF] ambient-bg-icon rotate-[-8deg] w-9 h-9" />
        <Terminal className="absolute top-[48%] left-[88%] text-[#38BDF8] ambient-bg-icon rotate-[5deg] w-9 h-9" />
        <Code className="absolute top-[64%] left-[94%] text-[#0072FF] ambient-bg-icon rotate-[20deg] w-9 h-9" />
      </div>
      
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-6 right-6 z-50 bg-white/95 border border-[#BFDBFE] backdrop-blur-md text-[#0F172A] px-5 py-3.5 rounded-xl shadow-xl shadow-blue-100/40 flex items-center gap-3 animate-fade-in font-semibold">
          <div className="w-2.5 h-2.5 rounded-full bg-[#38BDF8] animate-pulse glow-sky" />
          <span className="text-sm font-semibold text-[#475569]">{successToast}</span>
        </div>
      )}

      {/* LEFT SIDEBAR NAVIGATION */}
      <aside className="w-64 glass-sidebar flex flex-col justify-between py-6 px-5 flex-shrink-0 z-10 relative overflow-y-auto max-h-screen">
        {/* Sidebar Background Subtle Outline Icons */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0 opacity-[0.28]">
          <Terminal className="absolute top-[14%] right-[8%] rotate-[15deg] w-7 h-7 text-[#38BDF8]" />
          <Code className="absolute top-[28%] left-[10%] rotate-[-15deg] w-8 h-8 text-[#0072FF]" />
          <Bug className="absolute top-[42%] right-[12%] rotate-[20deg] w-7 h-7 text-[#a78bfa]" />
          <Sliders className="absolute top-[52%] left-[15%] rotate-[-12deg] w-8 h-8 text-[#38BDF8]" />
          <Shield className="absolute top-[64%] right-[8%] rotate-[-10deg] w-7 h-7 text-[#0072FF]" />
          <MessageSquare className="absolute top-[75%] left-[12%] rotate-[18deg] w-7 h-7 text-[#a78bfa]" />
          <Clock className="absolute top-[85%] right-[15%] rotate-[-8deg] w-8 h-8 text-[#38BDF8]" />
        </div>

        <div className="flex flex-col gap-6 relative z-10">
          {/* Logo container */}
          <div className="flex items-center gap-3 px-2">
            <div className="w-11 h-11 flex-shrink-0 drop-shadow-[0_2px_8px_rgba(2,132,199,0.15)]">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <linearGradient id="sidebarLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0284c7" />
                    <stop offset="100%" stopColor="#38bdf8" />
                  </linearGradient>
                </defs>
                <path d="M 10 47 L 10 28 L 50 5 L 90 28 L 90 47 L 74 47 L 74 38 L 50 24 L 26 38 L 26 47 Z" fill="url(#sidebarLogoGrad)" />
                <path d="M 90 53 L 90 72 L 50 95 L 10 72 L 10 53 L 26 53 L 26 62 L 50 76 L 74 62 L 74 53 Z" fill="url(#sidebarLogoGrad)" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-wider text-[#0F172A] font-title leading-tight">QA MIND</span>
              <span className="text-[11px] text-[#0284c7] font-bold uppercase tracking-wider leading-none mt-1 font-mono">WHERE DEVELOPERS LOSE PEACE</span>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex flex-col gap-1.5 mt-2">
            {(user.userRole === 'Developer' 
              ? [
                  { name: 'Dashboard', icon: LayoutDashboard },
                  { name: 'My Assigned Bugs', icon: Bug },
                  { name: 'Projects', icon: Folder },
                  { name: 'Settings', icon: SettingsIcon }
                ]
              : [
                  { name: 'Dashboard', icon: LayoutDashboard },
                  { name: 'Create Bug', icon: PlusCircle },
                  { name: 'Projects', icon: Folder },
                  { name: 'Settings', icon: SettingsIcon }
                ]
            ).map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.name;
              return (
                <button 
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-[15px] font-semibold transition-all duration-300 relative border ${
                    isActive 
                      ? 'bg-[#bae6fd] border-[#38bdf8] text-[#0369a1] shadow-[0_3px_12px_rgba(56,189,248,0.18)] font-semibold' 
                      : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#E0F2FE]/80 hover:border-[#BFDBFE]/50 border-transparent'
                  }`}
                >
                  <Icon size={20} className={isActive ? 'text-[#0284c7]' : 'text-[#475569] transition-colors'} />
                  <span>{tab.name}</span>
                  {isActive && (
                    <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-[#0284c7] glow-sky" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User profile section */}
        <div className="flex flex-col gap-4 border-t border-[#BFDBFE]/60 pt-5 relative z-10">
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
                <span>{user.userRole === 'Developer' ? 'Active Developer' : 'Active QA'}</span>
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
              <div className="w-9 h-9 flex-shrink-0 drop-shadow-[0_2px_6px_rgba(2,132,199,0.15)]">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <defs>
                    <linearGradient id="mobileLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0284c7" />
                      <stop offset="100%" stopColor="#38bdf8" />
                    </linearGradient>
                  </defs>
                  <path d="M 10 47 L 10 28 L 50 5 L 90 28 L 90 47 L 74 47 L 74 38 L 50 24 L 26 38 L 26 47 Z" fill="url(#mobileLogoGrad)" />
                  <path d="M 90 53 L 90 72 L 50 95 L 10 72 L 10 53 L 26 53 L 26 62 L 50 76 L 74 62 L 74 53 Z" fill="url(#mobileLogoGrad)" />
                </svg>
              </div>
              <span className="font-extrabold text-base text-[#0F172A] font-title leading-none">QA MIND</span>
            </div>
            
            <div className="hidden md:flex items-center gap-3 text-xs font-semibold select-none">
              <span className="text-[#475569] hover:text-[#0F172A] transition-colors cursor-pointer" onClick={() => setActiveTab('Dashboard')}>QA MIND</span>
              <span className="text-[#BFDBFE]">/</span>
              <span className="text-[#0F172A] font-bold">{activeTab}</span>
              {activeTab === 'Projects' && (
                <>
                  {projectTabProject && (
                    <>
                      <span className="text-[#BFDBFE]">/</span>
                      <button 
                        onClick={() => {
                          if (projectTabSubModule) {
                            setProjectTabSubModule(null);
                          } else if (projectTabModule) {
                            setProjectTabModule(null);
                          } else if (projectTabProject) {
                            setProjectTabProject(null);
                          }
                        }}
                        className="w-8 h-8 rounded-full bg-[#0072FF] text-white flex items-center justify-center hover:bg-[#0072FF]/90 transition-all cursor-pointer shadow-[0_2px_8px_rgba(0,114,255,0.2)] ml-2"
                        title="Back to previous level"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                      </button>
                    </>
                  )}
                  <span className="text-[#BFDBFE]">/</span>
                  <button 
                    onClick={() => setActiveTab('Dashboard')}
                    className="ml-2 px-4 py-1.5 rounded-full border border-[#0072FF] text-[10px] text-[#0072FF] hover:bg-[#0072FF]/5 hover:text-[#0072FF]/90 transition-all font-extrabold uppercase tracking-wider cursor-pointer bg-white"
                  >
                    Back to Dashboard
                  </button>
                </>
              )}
              {activeTab !== 'Dashboard' && activeTab !== 'Create Bug' && activeTab !== 'My Assigned Bugs' && activeTab !== 'Settings' && activeTab !== 'Projects' && (
                <>
                  <span className="text-[#BFDBFE]">/</span>
                  <button 
                    onClick={() => setActiveTab(activeTab === 'Bug Detail' ? 'My Assigned Bugs' : 'Dashboard')}
                    className="ml-2 px-2.5 py-1 rounded-lg bg-[#E0F2FE] border border-[#BFDBFE] text-[10px] text-[#38BDF8] hover:text-[#0F172A] hover:bg-[#E0F2FE]/80 transition-all font-bold uppercase tracking-wider cursor-pointer"
                  >
                    {activeTab === 'Bug Detail' ? '← Back to Bugs' : '← Back to Dashboard'}
                  </button>
                </>
              )}
              <span className="ml-3 text-[9px] text-[#38BDF8] font-bold bg-[#E0F2FE] px-2.5 py-0.5 rounded-full border border-[#BFDBFE] tracking-widest font-mono shadow-[0_2px_10px_rgba(56,189,248,0.1)]">
                ENV: PROD
              </span>
            </div>
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
        <main className="h-[calc(100vh-5rem)] overflow-y-auto p-6 md:p-8 flex flex-col gap-6 md:gap-8">
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
              getPriorityBadgeClass={getPriorityBadgeClass}
              teamMembers={teamMembers}
              onSelectDeveloper={(name) => {
                setSelectedWorkloadMember(name);
                setWorkloadFilterTab('All');
                setActiveTab('Developers');
              }}
              onLinkToBug={handleLinkToBug}
              PROJECT_MODULES={projectModules}
              MODULE_SUBMODULES={moduleSubmodules}
              onAddProject={handleAddProject}
              setActiveTab={setActiveTab}
              user={user}
            />
          )}

          {activeTab === 'Bugs' && (
            <BugsView 
              bugs={operationsFilteredBugs}
              allBugs={bugs}
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
              teamMembers={teamMembers}
              setBugs={setBugs}
              user={user}
              activities={activities}
              setActivities={setActivities}
              triggerToast={triggerToast}
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
              teamMembers={teamMembers}
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
              teamMembers={teamMembers}
              getSeverityBadgeClass={getSeverityBadgeClass}
              getStatusBadgeClass={getStatusBadgeClass}
              handleLinkToBug={handleLinkToBug}
            />
          )}

           {activeTab === 'Projects' && (
             <ProjectsView 
               bugs={bugs}
               projectsList={projectsList}
               PROJECT_MODULES={projectModules}
               MODULE_SUBMODULES={moduleSubmodules}
               onAddProject={handleAddProject}
               getSeverityBadgeClass={getSeverityBadgeClass}
               getStatusBadgeClass={getStatusBadgeClass}
               getPriorityBadgeClass={getPriorityBadgeClass}
               onLinkToBug={handleLinkToBug}
               setActiveTab={setActiveTab}
                selectedProject={projectTabProject}
                setSelectedProject={setProjectTabProject}
                selectedModule={projectTabModule}
                setSelectedModule={setProjectTabModule}
                selectedSubModule={projectTabSubModule}
                setSelectedSubModule={setProjectTabSubModule}
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
              formTitle={formTitle}
              setFormTitle={setFormTitle}
              formDescription={formDescription}
              setFormDescription={setFormDescription}
              formPriority={formPriority}
              setFormPriority={setFormPriority}
              formSeverity={formSeverity}
              setFormSeverity={setFormSeverity}
              formAssignedTo={formAssignedTo}
              setFormAssignedTo={setFormAssignedTo}
              formRemarks={formRemarks}
              setFormRemarks={setFormRemarks}
              formScreenshot={formScreenshot}
              setFormScreenshot={setFormScreenshot}
              previewUrl={previewUrl}
              setPreviewUrl={setPreviewUrl}
              nextBugId={`BUG-${bugs.reduce((acc, curr) => { const num = parseInt(curr.id.split('-')[1]); return num > acc ? num : acc; }, 125) + 1}`}
              loggedInUser={user.username || user.name}
              onSubmit={handleCreateBug}
              onClear={handleClearForm}
              onCancel={() => {
                handleClearForm();
                setActiveTab('Dashboard');
              }}
              PROJECT_MODULES={projectModules}
              MODULE_SUBMODULES={moduleSubmodules}
              onAddProject={handleAddProject}
              teamMembers={teamMembers}
              getSeverityBadgeClass={getSeverityBadgeClass}
              getPriorityBadgeClass={getPriorityBadgeClass}
            />
          )}

          {activeTab === 'My Assigned Bugs' && (
            <MyAssignedBugsView 
              bugs={bugs}
              user={user}
              onSelectBug={(bugId) => {
                setExpandedBugId(bugId);
                setActiveTab('Bug Detail');
              }}
              getSeverityBadgeClass={getSeverityBadgeClass}
              getPriorityBadgeClass={getPriorityBadgeClass}
              getStatusBadgeClass={getStatusBadgeClass}
            />
          )}

          {activeTab === 'Bug Detail' && (
            <BugDetailView 
              bugId={expandedBugId}
              bugs={bugs}
              setBugs={setBugs}
              activities={activities}
              setActivities={setActivities}
              user={user}
              triggerToast={triggerToast}
              setActiveTab={setActiveTab}
              getSeverityBadgeClass={getSeverityBadgeClass}
              getPriorityBadgeClass={getPriorityBadgeClass}
              getStatusBadgeClass={getStatusBadgeClass}
              teamMembers={teamMembers}
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
          <div className="relative w-[600px] h-full shadow-2xl bg-white border-l border-[#BFDBFE] flex flex-col justify-between py-8 px-6 animate-slide-in overflow-y-auto">
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-[#0F172A] flex items-center gap-2 font-title">
                    <span>Update Status</span>
                    <span className="font-mono text-xs font-semibold text-[#0284c7] bg-[#0284c7]/10 px-2 py-0.5 rounded border border-[#0284c7]/20">
                      {updateBugId}
                    </span>
                  </h2>
                  <p className="text-sm text-[#475569] mt-1">Set Developer resolution metrics and comments.</p>
                </div>
                <button 
                  onClick={() => setUpdateBugId(null)}
                  className="p-2 rounded-xl text-[#475569] hover:bg-[#E0F2FE]/50 hover:text-[#0F172A] transition-all border border-[#BFDBFE]/60"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Bug Details overview */}
              {(() => {
                const b = bugs.find(x => x.id === updateBugId);
                if (!b) return null;
                return (
                  <div className="flex flex-col gap-4 border-y border-[#BFDBFE]/60 py-4">
                    <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs">
                      <div>
                        <span className="text-[#475569] block font-medium">Project</span>
                        <span className="text-[#0F172A] font-bold block truncate mt-0.5">{b.project}</span>
                      </div>
                      <div>
                        <span className="text-[#475569] block font-medium">Module / Sub Module</span>
                        <span className="text-[#0F172A] font-bold block truncate mt-0.5">{b.module} • {b.subModule}</span>
                      </div>
                      <div>
                        <span className="text-[#475569] block font-medium">Severity</span>
                        <span className={`badge px-2 py-0.5 text-[9.5px] mt-1 inline-block rounded-full font-bold ${getSeverityBadgeClass(b.severity)}`}>
                          {b.severity}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#475569] block font-medium">Tester Status</span>
                        <span className={`badge px-2 py-0.5 text-[9.5px] mt-1 inline-block rounded font-bold ${getStatusBadgeClass(b.testerStatus)}`}>
                          {b.testerStatus}
                        </span>
                      </div>
                    </div>
                    <div className="bg-[#F8FBFF] p-3 rounded-lg border border-[#BFDBFE]">
                      <span className="text-[9px] text-[#475569] uppercase font-bold font-mono tracking-wider block mb-1">Description</span>
                      <p className="text-xs text-[#0F172A] leading-relaxed max-h-24 overflow-y-auto">{b.description}</p>
                    </div>
                  </div>
                );
              })()}

              {/* Input section */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#475569]">Developer Status</label>
                  <select 
                    value={editDevStatus}
                    onChange={(e) => setEditDevStatus(e.target.value)}
                    className="w-full h-11 px-4 text-sm rounded-xl bg-white border border-[#BFDBFE] text-[#0F172A] cursor-pointer focus:bg-[#F8FBFF] focus:border-[#38bdf8] outline-none"
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Fixed">Fixed</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#475569]">Comment / Resolution Notes</label>
                  <textarea 
                    value={editComment}
                    onChange={(e) => setEditComment(e.target.value)}
                    placeholder="Provide details on the fix, troubleshooting, or current blocker status..."
                    className="w-full min-h-[120px] max-h-[160px] p-4 text-sm rounded-xl bg-white border border-[#BFDBFE] text-[#0F172A] placeholder-[#94A3B8] focus:bg-[#F8FBFF] focus:border-[#38bdf8] outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Save Buttons */}
            <div className="flex gap-3 pt-6 border-t border-[#BFDBFE]/60">
              <button 
                onClick={() => setUpdateBugId(null)}
                className="flex-1 h-12 rounded-xl text-[#475569] font-bold border border-[#BFDBFE] hover:bg-[#E0F2FE]/50 hover:text-[#0F172A] transition-all text-sm"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveStatusUpdate}
                className="flex-1 h-12 rounded-xl bg-gradient-to-r from-[#38bdf8] to-[#22d3ee] text-black font-bold hover:brightness-110 transition-all text-sm shadow-lg shadow-sky-600/20"
              >
                Save Status Update
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
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [selectedRole, setSelectedRole] = useState('QA Engineer');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Additional validation checks
    if (!/^[a-zA-Z]+$/.test(username)) {
      setError('Username must contain only alphabets.');
      return;
    }
    if (username.length > 20) {
      setError('Username must be 20 characters or less.');
      return;
    }
    if (!fullName.trim()) {
      setError('Full Name is required.');
      return;
    }
    if (fullName.length > 20) {
      setError('Full Name must be 20 characters or less.');
      return;
    }
    if (email.length > 20) {
      setError('Email must be 20 characters or less.');
      return;
    }
    if (!/^\d{4}$/.test(password)) {
      setError('Password must be exactly 4 numbers.');
      return;
    }

    setError('');
    onLogin(email, password, username, fullName, selectedRole);
  };

  const handleQuickAccess = (type) => {
    if (type === 'priya') {
      setUsername('priya');
      setFullName('Priya Sharma');
      setEmail('priya@qamind.io');
      setPassword('1234');
      setSelectedRole('QA Engineer');
    } else {
      setUsername('rahul');
      setFullName('Rahul Verma');
      setEmail('rahul@qamind.io');
      setPassword('5678');
      setSelectedRole('Developer');
    }
    setError('');
  };

  return (
    <div className="w-screen min-h-screen overflow-y-auto flex flex-col lg:flex-row bg-[#EEF6FF] relative font-sans select-none items-center justify-center lg:justify-between px-6 md:px-12 lg:px-20 py-10 lg:py-0">
      
      {/* Background Glowing Ambient Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] bg-[#38BDF8]/10 animate-pulse pointer-events-none select-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] bg-[#38BDF8]/10 animate-pulse pointer-events-none select-none" />

      {/* Grid of Dots in top-left */}
      <div className="absolute top-[5%] left-[3%] grid grid-cols-6 gap-2.5 opacity-[0.4] pointer-events-none">
        {[...Array(24)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
        ))}
      </div>

      {/* Floating bright background outline tech icons distributed all over the page */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Left column / side background icons */}
        <Terminal className="absolute top-[5%] left-[7%] text-[#38BDF8] ambient-bg-icon rotate-[-5deg] w-9 h-9" />
        <Code className="absolute top-[8%] left-[16%] text-[#38BDF8] ambient-bg-icon rotate-[12deg] w-10 h-10" />
        <Shield className="absolute top-[20%] left-[5%] text-[#38BDF8] ambient-bg-icon rotate-[-8deg] w-8 h-8" />
        <Search className="absolute top-[18%] left-[25%] text-[#0072FF] ambient-bg-icon rotate-[-12deg] w-8 h-8" />
        <Bug className="absolute top-[32%] left-[23%] text-[#38BDF8] ambient-bg-icon rotate-[25deg] w-9 h-9" />
        <CheckSquare className="absolute top-[26%] left-[31%] text-[#0072FF] ambient-bg-icon rotate-[15deg] w-9 h-9" />
        <Calendar className="absolute top-[42%] left-[9%] text-[#38BDF8] ambient-bg-icon rotate-[8deg] w-9 h-9" />
        <Sliders className="absolute top-[48%] left-[32%] text-[#38BDF8] ambient-bg-icon rotate-[-15deg] w-8 h-8" />
        <MessageSquare className="absolute top-[58%] left-[20%] text-[#0072FF] ambient-bg-icon rotate-[-20deg] w-9 h-9" />
        <FileText className="absolute top-[70%] left-[7%] text-[#38BDF8] ambient-bg-icon rotate-[12deg] w-8 h-8" />
        <Briefcase className="absolute top-[64%] left-[29%] text-[#38BDF8] ambient-bg-icon rotate-[5deg] w-9 h-9" />
        <AlertCircle className="absolute top-[76%] left-[24%] text-[#0072FF] ambient-bg-icon rotate-[-10deg] w-9 h-9" />
        <SettingsIcon className="absolute top-[82%] left-[12%] text-[#38BDF8] ambient-bg-icon rotate-[18deg] w-9 h-9" />

        {/* Center area background icons */}
        <Code className="absolute top-[6%] left-[42%] text-[#0072FF] ambient-bg-icon rotate-[20deg] w-10 h-10" />
        <Search className="absolute top-[22%] left-[50%] text-[#38BDF8] ambient-bg-icon rotate-[8deg] w-8 h-8" />
        <Shield className="absolute top-[46%] left-[58%] text-[#0072FF] ambient-bg-icon rotate-[12deg] w-9 h-9" />
        <Terminal className="absolute top-[70%] left-[45%] text-[#38BDF8] ambient-bg-icon rotate-[10deg] w-9 h-9" />
        <Bug className="absolute top-[85%] left-[55%] text-[#0072FF] ambient-bg-icon rotate-[-15deg] w-9 h-9" />

        {/* Right column / side background icons behind/around the card */}
        <Sliders className="absolute top-[4%] left-[76%] text-[#38BDF8] ambient-bg-icon rotate-[-10deg] w-9 h-9" />
        <Code className="absolute top-[14%] left-[88%] text-[#0072FF] ambient-bg-icon rotate-[25deg] w-10 h-10" />
        <MessageSquare className="absolute top-[30%] left-[70%] text-[#38BDF8] ambient-bg-icon rotate-[-12deg] w-9 h-9" />
        <CheckSquare className="absolute top-[40%] left-[90%] text-[#0072FF] ambient-bg-icon rotate-[8deg] w-9 h-9" />
        <Calendar className="absolute top-[55%] left-[82%] text-[#38BDF8] ambient-bg-icon rotate-[-15deg] w-9 h-9" />
        <Bug className="absolute top-[62%] left-[94%] text-[#0072FF] ambient-bg-icon rotate-[20deg] w-9 h-9" />
        <FileText className="absolute top-[78%] left-[74%] text-[#38BDF8] ambient-bg-icon rotate-[5deg] w-9 h-9" />
        <Briefcase className="absolute top-[88%] left-[86%] text-[#38BDF8] ambient-bg-icon rotate-[-8deg] w-9 h-9" />
        <AlertCircle className="absolute top-[93%] left-[95%] text-[#0072FF] ambient-bg-icon rotate-[15deg] w-9 h-9" />
      </div>

      {/* LEFT COLUMN: Large branding side-by-side (Logo + Text) */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-8 z-10 h-full">
        <div className="flex items-center gap-8 lg:gap-12 max-w-2xl">
          {/* Large Logo */}
          <div className="w-52 h-52 xl:w-64 xl:h-64 flex-shrink-0 drop-shadow-[0_12px_36px_rgba(2,132,199,0.22)]">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <defs>
                <linearGradient id="largeLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0284c7" />
                  <stop offset="100%" stopColor="#0072FF" />
                </linearGradient>
              </defs>
              <path d="M 10 47 L 10 28 L 50 5 L 90 28 L 90 47 L 74 47 L 74 38 L 50 24 L 26 38 L 26 47 Z" fill="url(#largeLogoGrad)" />
              <path d="M 90 53 L 90 72 L 50 95 L 10 72 L 10 53 L 26 53 L 26 62 L 50 76 L 74 62 L 74 53 Z" fill="url(#largeLogoGrad)" />
            </svg>
          </div>
          {/* Large Text */}
          <div className="flex flex-col">
            <h1 className="font-extrabold text-7xl xl:text-9xl tracking-wide text-[#0C1B3D] font-title leading-none uppercase">QA MIND</h1>
            <p className="text-base xl:text-xl text-[#0072FF] font-bold uppercase tracking-[0.2em] mt-4 font-sans whitespace-nowrap">WHERE DEVELOPERS LOSE PEACE</p>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Centered Login Card */}
      <div className="w-full lg:w-[45%] flex items-center justify-center p-4 md:p-8 z-10 h-full">
        <div className="w-full max-w-[530px] rounded-[36px] p-10 md:p-12 bg-white border border-[#E2EEFC] shadow-[0_16px_48px_rgba(191,219,254,0.2)] flex flex-col gap-8">
          
          {/* Card Header (Logo + Text side-by-side) */}
          <div className="flex items-center gap-4.5">
            {/* Small Logo */}
            <div className="w-15 h-15 flex-shrink-0 drop-shadow-[0_4px_12px_rgba(2,132,199,0.18)]">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <linearGradient id="cardLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0284c7" />
                    <stop offset="100%" stopColor="#0072FF" />
                  </linearGradient>
                </defs>
                <path d="M 10 47 L 10 28 L 50 5 L 90 28 L 90 47 L 74 47 L 74 38 L 50 24 L 26 38 L 26 47 Z" fill="url(#cardLogoGrad)" />
                <path d="M 90 53 L 90 72 L 50 95 L 10 72 L 10 53 L 26 53 L 26 62 L 50 76 L 74 62 L 74 53 Z" fill="url(#cardLogoGrad)" />
              </svg>
            </div>
            {/* Header Text */}
            <div className="flex flex-col">
              <span className="font-extrabold text-4xl tracking-wide text-[#0C1B3D] font-title leading-none uppercase">QA MIND</span>
              <span className="text-[11px] text-[#0072FF] font-bold uppercase tracking-[0.16em] mt-2 font-sans whitespace-nowrap">WHERE DEVELOPERS LOSE PEACE</span>
            </div>
          </div>

          <div className="w-16 h-[2px] bg-[#EEF6FF]" />

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5.5">
            {error && (
              <div className="bg-red-50 text-red-500 text-sm font-semibold p-3.5 rounded-xl border border-red-200 flex items-center gap-2 animate-fade-in">
                <AlertCircle size={16} className="flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Role Selection Segmented Control */}
            <div className="flex flex-col gap-2">
              <label className="text-base font-bold text-[#475569] pl-1">Select workspace role</label>
              <div className="flex bg-[#F0F7FF] p-1.5 rounded-2xl border border-[#D2E4FA] gap-1 relative select-none">
                <button
                  type="button"
                  onClick={() => setSelectedRole('QA Engineer')}
                  className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 cursor-pointer ${
                    selectedRole === 'QA Engineer'
                      ? 'bg-[#38BDF8] text-white shadow-md shadow-[#38BDF8]/20 font-extrabold'
                      : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#EEF6FF]/60'
                  }`}
                >
                  QA Engineer
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole('Developer')}
                  className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 cursor-pointer ${
                    selectedRole === 'Developer'
                      ? 'bg-[#38BDF8] text-white shadow-md shadow-[#38BDF8]/20 font-extrabold'
                      : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#EEF6FF]/60'
                  }`}
                >
                  Developer
                </button>
              </div>
            </div>

            {/* Username Field */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center pl-1">
                <label className="text-base font-bold text-[#475569]">Username</label>
                <span className="text-xs text-slate-400 font-medium">Max 20 alphabets</span>
              </div>
              <div className="relative w-full flex items-center">
                <User className="absolute left-5 text-slate-400 w-5 h-5 pointer-events-none" />
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^a-zA-Z]/g, '');
                    if (val.length <= 20) {
                      setUsername(val);
                    }
                  }}
                  placeholder="priya"
                  required
                  autoComplete="off"
                  className="w-full h-14 pl-14 pr-4 rounded-xl bg-white border border-[#D0E3F9] text-[#0F172A] text-base font-semibold placeholder-[#94A3B8] focus:bg-white focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20 outline-none transition-all"
                />
              </div>
            </div>

            {/* Full Name Field */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center pl-1">
                <label className="text-base font-bold text-[#475569]">Full Name</label>
                <span className="text-xs text-slate-400 font-medium">Max 20 chars</span>
              </div>
              <div className="relative w-full flex items-center">
                <User className="absolute left-5 text-slate-400 w-5 h-5 pointer-events-none" />
                <input 
                  type="text" 
                  value={fullName}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val.length <= 20) {
                      setFullName(val);
                    }
                  }}
                  placeholder="Priya Sharma"
                  required
                  autoComplete="off"
                  className="w-full h-14 pl-14 pr-4 rounded-xl bg-white border border-[#D0E3F9] text-[#0F172A] text-base font-semibold placeholder-[#94A3B8] focus:bg-white focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20 outline-none transition-all"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center pl-1">
                <label className="text-base font-bold text-[#475569]">Email Address</label>
                <span className="text-xs text-slate-400 font-medium">Max 20 chars</span>
              </div>
              <div className="relative w-full flex items-center">
                <Mail className="absolute left-5 text-slate-400 w-5 h-5 pointer-events-none" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val.length <= 20) {
                      setEmail(val);
                    }
                  }}
                  placeholder="priya@qamind.io"
                  required
                  autoComplete="off"
                  className="w-full h-14 pl-14 pr-4 rounded-xl bg-white border border-[#D0E3F9] text-[#0F172A] text-base font-semibold placeholder-[#94A3B8] focus:bg-white focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20 outline-none transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center pl-1">
                <label className="text-base font-bold text-[#475569]">Password</label>
                <span className="text-xs text-slate-400 font-medium">Exactly 4 digits</span>
              </div>
              <div className="relative w-full flex items-center">
                <Lock className="absolute left-5 text-slate-400 w-5 h-5 pointer-events-none" />
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, '');
                    if (val.length <= 4) {
                      setPassword(val);
                    }
                  }}
                  placeholder="••••"
                  required
                  autoComplete="off"
                  className="w-full h-14 pl-14 pr-12 rounded-xl bg-white border border-[#D0E3F9] text-[#0F172A] text-base font-semibold placeholder-[#94A3B8] focus:bg-white focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 text-slate-400 hover:text-[#0F172A] transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full h-14 mt-3 rounded-xl bg-gradient-to-r from-[#38bdf8] to-[#3b82f6] text-white font-bold hover:brightness-105 shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 transition-all text-base tracking-wide cursor-pointer"
            >
              Authenticate Workspace
            </button>
          </form>

          {/* Quick-Access Helper Box */}
          <div className="bg-[#F6FAFF] p-5 rounded-2xl border border-[#D2E4FA] text-center w-full">
            <p className="text-sm text-[#5c6f84] leading-relaxed">
              <span className="font-bold text-[#3B4D61]">Quick-access login:</span> Use standard email (e.g.{" "}
              <button 
                type="button" 
                onClick={() => handleQuickAccess('priya')}
                className="font-bold text-[#0072FF] hover:underline cursor-pointer focus:outline-none text-sm bg-transparent border-none p-0"
              >
                priya@qamind.io
              </button>{" "}
              or{" "}
              <button 
                type="button" 
                onClick={() => handleQuickAccess('rahul')}
                className="font-bold text-[#0072FF] hover:underline cursor-pointer focus:outline-none text-sm bg-transparent border-none p-0"
              >
                rahul@qamind.io
              </button>
              ) to test workspace capabilities.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}

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
  getPriorityBadgeClass,
  teamMembers,
  onSelectDeveloper,
  onLinkToBug,
  PROJECT_MODULES,
  MODULE_SUBMODULES,
  user,
  setActiveTab
}) {
  
  // Custom Donut Chart Arc Segment Generator
  const donutData = useMemo(() => {
    const open = bugs.filter(b => b.testerStatus === 'Open' || b.testerStatus === 'Assigned' || b.testerStatus === 'Reassigned').length;
    const inProgress = bugs.filter(b => b.devStatus === 'In Progress' && b.testerStatus !== 'Closed').length;
    const retest = bugs.filter(b => b.testerStatus === 'Retesting' || b.testerStatus === 'Retest').length;
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

  const isDev = user && user.userRole === 'Developer';

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
            className="h-10 px-4 rounded-xl bg-[#f0f9ff] border border-[#38bdf8] text-[#0369a1] text-xs font-semibold cursor-pointer outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/20 transition-colors"
          >
            <option value="All" className="bg-white text-[#0F172A]">All Projects</option>
            {Object.keys(PROJECT_MODULES).map(proj => (
              <option key={proj} value={proj} className="bg-white text-[#0F172A]">{proj}</option>
            ))}
          </select>

          {/* Module Dropdown */}
          <select 
            value={selectedModule}
            onChange={(e) => onModuleChange(e.target.value)}
            className="h-10 px-4 rounded-xl bg-[#f0f9ff] border border-[#38bdf8] text-[#0369a1] text-xs font-semibold cursor-pointer outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/20 transition-colors"
          >
            <option value="All" className="bg-white text-[#0F172A]">All Modules</option>
            {selectedProject !== 'All' && PROJECT_MODULES[selectedProject]?.map(mod => (
              <option key={mod} value={mod} className="bg-white text-[#0F172A]">{mod}</option>
            ))}
          </select>

          {/* SubModule Dropdown */}
          <select 
            value={selectedSubModule}
            onChange={(e) => onSubModuleChange(e.target.value)}
            className="h-10 px-4 rounded-xl bg-[#f0f9ff] border border-[#38bdf8] text-[#0369a1] text-xs font-semibold cursor-pointer outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/20 transition-colors"
          >
            <option value="All" className="bg-white text-[#0F172A]">All Sub Modules</option>
            {selectedModule !== 'All' && MODULE_SUBMODULES[selectedModule]?.map(sub => (
              <option key={sub} value={sub} className="bg-white text-[#0F172A]">{sub}</option>
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
        {isDev ? (
          <>
            {/* Developer Card 1: My Open Bugs */}
            <div className="p-6 rounded-2xl glass-card glass-card-hover flex flex-col gap-3 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-sky-500/10 transition-all" />
              <AlertCircle size={80} className="absolute right-[-10px] bottom-[-15px] text-[#38BDF8]/5 pointer-events-none select-none group-hover:scale-110 transition-transform duration-300" />
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-bold text-[#475569] uppercase tracking-wider">My Open Bugs</span>
                  <span className="text-[9px] text-[#38BDF8] font-bold uppercase tracking-wide font-mono">Assigned backlog</span>
                </div>
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-500 text-white flex items-center justify-center shadow-md shadow-sky-500/20">
                  <AlertCircle size={17} />
                </div>
              </div>
              <div className="flex items-baseline justify-between mt-2">
                <div className="flex flex-col">
                  <span className="text-3.5xl font-extrabold text-[#0F172A] leading-tight font-title">{metrics.open}</span>
                  <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
                    <span>Active Queue</span>
                  </span>
                </div>
                <div className="w-20 h-8 select-none">
                  <svg viewBox="0 0 100 30" className="w-full h-full stroke-sky-500 fill-none" strokeWidth="2" strokeLinecap="round">
                    <path d={sparklineData.toFix} />
                  </svg>
                </div>
              </div>
              <div className="h-px bg-[#BFDBFE]/60 my-1" />
              <span className="text-[10px] text-[#94A3B8] font-medium">Bugs assigned to you awaiting analysis</span>
            </div>

            {/* Developer Card 2: In Progress */}
            <div className="p-6 rounded-2xl glass-card glass-card-hover flex flex-col gap-3 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-indigo-500/10 transition-all" />
              <Clock size={80} className="absolute right-[-10px] bottom-[-15px] text-indigo-500/5 pointer-events-none select-none group-hover:scale-110 transition-transform duration-300" />
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-bold text-[#475569] uppercase tracking-wider">In Progress</span>
                  <span className="text-[9px] text-[#818cf8] font-bold uppercase tracking-wide font-mono">Working state</span>
                </div>
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
                  <Clock size={17} />
                </div>
              </div>
              <div className="flex items-baseline justify-between mt-2">
                <div className="flex flex-col">
                  <span className="text-3.5xl font-extrabold text-[#0F172A] leading-tight font-title">{metrics.inProgress}</span>
                  <span className="text-[10px] text-[#818cf8] font-bold flex items-center gap-1 mt-1">
                    <span>Under Fix</span>
                  </span>
                </div>
                <div className="w-20 h-8 select-none">
                  <svg viewBox="0 0 100 30" className="w-full h-full stroke-indigo-500 fill-none" strokeWidth="2" strokeLinecap="round">
                    <path d={sparklineData.active} />
                  </svg>
                </div>
              </div>
              <div className="h-px bg-[#BFDBFE]/60 my-1" />
              <span className="text-[10px] text-[#94A3B8] font-medium">Defects currently in development fix lifecycle</span>
            </div>

            {/* Developer Card 3: Fixed Bugs */}
            <div className="p-6 rounded-2xl glass-card glass-card-hover flex flex-col gap-3 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-500/10 transition-all" />
              <CheckCircle2 size={80} className="absolute right-[-10px] bottom-[-15px] text-emerald-500/5 pointer-events-none select-none group-hover:scale-110 transition-transform duration-300" />
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-bold text-[#475569] uppercase tracking-wider">Fixed Bugs</span>
                  <span className="text-[9px] text-emerald-600 font-bold uppercase tracking-wide font-mono">Retesting Queue</span>
                </div>
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#11998e] to-[#38ef7d] text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
                  <CheckCircle2 size={17} />
                </div>
              </div>
              <div className="flex items-baseline justify-between mt-2">
                <div className="flex flex-col">
                  <span className="text-3.5xl font-extrabold text-[#0F172A] leading-tight font-title">{metrics.fixed}</span>
                  <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
                    <span>Awaiting QA</span>
                  </span>
                </div>
                <div className="w-20 h-8 select-none">
                  <svg viewBox="0 0 100 30" className="w-full h-full stroke-emerald-500 fill-none" strokeWidth="2" strokeLinecap="round">
                    <path d={sparklineData.closed} />
                  </svg>
                </div>
              </div>
              <div className="h-px bg-[#BFDBFE]/60 my-1" />
              <span className="text-[10px] text-[#94A3B8] font-medium">Bugs resolved and moved to retesting</span>
            </div>

            {/* Developer Card 4: Critical Bugs */}
            <div className="p-6 rounded-2xl glass-card glass-card-hover flex flex-col gap-3 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-red-500/10 transition-all" />
              <AlertOctagon size={80} className="absolute right-[-10px] bottom-[-15px] text-red-500/5 pointer-events-none select-none group-hover:scale-110 transition-transform duration-300" />
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-bold text-[#475569] uppercase tracking-wider">Critical Bugs</span>
                  <span className="text-[9px] text-red-500 font-bold uppercase tracking-wide font-mono">P1 / Blocker</span>
                </div>
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-500 to-rose-600 text-white flex items-center justify-center shadow-md shadow-red-500/20">
                  <AlertOctagon size={17} />
                </div>
              </div>
              <div className="flex items-baseline justify-between mt-2">
                <div className="flex flex-col">
                  <span className="text-3.5xl font-extrabold text-[#0F172A] leading-tight font-title">{metrics.critical}</span>
                  <span className="text-[10px] text-red-500 font-bold flex items-center gap-1 mt-1">
                    <span>High Priority</span>
                  </span>
                </div>
                <div className="w-20 h-8 select-none">
                  <svg viewBox="0 0 100 30" className="w-full h-full stroke-red-500 fill-none" strokeWidth="2" strokeLinecap="round">
                    <path d={sparklineData.retest} />
                  </svg>
                </div>
              </div>
              <div className="h-px bg-[#BFDBFE]/60 my-1" />
              <span className="text-[10px] text-[#94A3B8] font-medium">Critical or Blocker defects assigned to you</span>
            </div>
          </>
        ) : (
          <>
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
            <div 
              onClick={() => setActiveTab('Retesting')}
              className="p-6 rounded-2xl glass-card glass-card-hover flex flex-col gap-3 relative overflow-hidden group cursor-pointer"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-indigo-500/10 transition-all" />
              <Clock size={80} className="absolute right-[-10px] bottom-[-15px] text-indigo-500/5 pointer-events-none select-none group-hover:scale-110 transition-transform duration-300" />
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-bold text-[#475569] uppercase tracking-wider">Retest Pending</span>
                  <span className="text-[9px] text-[#818cf8] font-bold uppercase tracking-wide font-mono">Verification queue (Click to view)</span>
                </div>
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#38bdf8] to-[#0072ff] text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
                  <Clock size={17} />
                </div>
              </div>
              <div className="flex items-baseline justify-between mt-2">
                <div className="flex flex-col">
                  <span className="text-3.5xl font-extrabold text-[#0F172A] leading-tight font-title">{metrics.retest}</span>
                  <span className="text-[10px] text-[#38BDF8] font-bold flex items-center gap-1 mt-1">
                    <span>Awaiting Retest</span>
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
          </>
        )}
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
                        <span className="font-bold text-[#0F172A] block truncate max-w-[200px]" title={bug.title || bug.project}>{bug.title || bug.project}</span>
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
  allBugs,
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
  const [currentPage, setCurrentPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sortBy, setSortBy] = React.useState('Latest');

  const toggleRow = (bugId) => {
    if (expandedBugId === bugId) {
      setExpandedBugId(null);
    } else {
      setExpandedBugId(bugId);
    }
  };

  // Calculate dynamic metrics from unfiltered database
  const totalCount = allBugs.length;
  const openCount = allBugs.filter(b => b.devStatus === 'Open').length;
  const inProgressCount = allBugs.filter(b => b.devStatus === 'In Progress').length;
  const fixedCount = allBugs.filter(b => b.devStatus === 'Fixed').length;
  const closedCount = allBugs.filter(b => b.testerStatus === 'Closed').length;

  // Visual color configuration helper for left accent border
  const getLeftBorderColor = (severity, devStatus) => {
    if (devStatus === 'Fixed' || devStatus === 'Closed') {
      return 'border-l-[5px] border-l-emerald-500';
    }
    switch(severity) {
      case 'Blocker':
      case 'Critical':
        return 'border-l-[5px] border-l-red-500';
      case 'Major':
      case 'High':
        return 'border-l-[5px] border-l-orange-500';
      case 'Medium':
        return 'border-l-[5px] border-l-amber-500';
      case 'Minor':
      case 'Low':
        return 'border-l-[5px] border-l-emerald-500';
      default:
        return 'border-l-[5px] border-l-slate-300';
    }
  };

  // Apply sorting
  const sortedBugs = React.useMemo(() => {
    const list = [...bugs];
    if (sortBy === 'Latest') {
      return list.sort((a, b) => {
        const numA = parseInt(a.id.split('-')[1]);
        const numB = parseInt(b.id.split('-')[1]);
        return numB - numA;
      });
    } else {
      return list.sort((a, b) => {
        const numA = parseInt(a.id.split('-')[1]);
        const numB = parseInt(b.id.split('-')[1]);
        return numA - numB;
      });
    }
  }, [bugs, sortBy]);

  // Apply pagination
  const totalFiltered = sortedBugs.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / rowsPerPage));
  
  React.useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalFiltered, totalPages, currentPage]);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedBugs = React.useMemo(() => {
    return sortedBugs.slice(startIndex, startIndex + rowsPerPage);
  }, [sortedBugs, startIndex, rowsPerPage]);

  return (
    <div className="flex flex-col gap-6 animate-fade-in text-[#475569] module-bg-container pb-10">
      <div className="module-bg-overlay" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80")' }} />
      
      {/* Metrics Cards Grid */}
      <section className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Bugs */}
        <div className="p-4 rounded-2xl bg-white border border-[#BFDBFE] flex items-center gap-3.5 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0284c7] flex items-center justify-center flex-shrink-0">
            <Bug size={18} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Total Defects</span>
            <span className="text-xl font-extrabold text-[#0F172A] mt-0.5">{totalCount}</span>
          </div>
        </div>

        {/* Open */}
        <div className="p-4 rounded-2xl bg-white border border-[#BFDBFE] flex items-center gap-3.5 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
            <Folder size={18} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Open</span>
            <span className="text-xl font-extrabold text-[#0F172A] mt-0.5">{openCount}</span>
          </div>
        </div>

        {/* In Progress */}
        <div className="p-4 rounded-2xl bg-white border border-[#BFDBFE] flex items-center gap-3.5 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#38BDF8] flex items-center justify-center flex-shrink-0">
            <Activity size={18} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">In Progress</span>
            <span className="text-xl font-extrabold text-[#0F172A] mt-0.5">{inProgressCount}</span>
          </div>
        </div>

        {/* Fixed */}
        <div className="p-4 rounded-2xl bg-white border border-[#BFDBFE] flex items-center gap-3.5 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 size={18} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Fixed</span>
            <span className="text-xl font-extrabold text-[#0F172A] mt-0.5">{fixedCount}</span>
          </div>
        </div>

        {/* Closed */}
        <div className="p-4 rounded-2xl bg-white border border-[#BFDBFE] flex items-center gap-3.5 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
            <CheckSquare size={18} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Closed</span>
            <span className="text-xl font-extrabold text-[#0F172A] mt-0.5">{closedCount}</span>
          </div>
        </div>
      </section>

      {/* Search, Filter, and Sort Panel */}
      <section className="p-4 px-6 rounded-2xl bg-white border border-[#BFDBFE] backdrop-blur-md flex flex-wrap gap-4 items-center justify-between shadow-sm">
        <div className="flex items-center gap-4 flex-wrap">
          {/* Search */}
          <div className="relative w-80">
            <Search size={14} className="absolute left-4 top-3.5 text-[#94A3B8]" />
            <input 
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Bug ID, module, description..."
              className="w-full h-10 pl-11 pr-4 rounded-xl bg-[#F8FBFF] border border-[#BFDBFE] text-xs text-[#0F172A] placeholder-[#94A3B8] outline-none focus:bg-white focus:border-[#38BDF8]"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#475569] font-bold">Priority:</span>
            <select 
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className={`h-9 px-3 outline-none cursor-pointer transition-all font-bold ${
                priorityFilter === 'All' 
                  ? 'bg-[#F0F9FF] border border-[#38bdf8] text-[#0369a1] rounded-lg' 
                  : getPriorityBadgeClass(priorityFilter)
              }`}
            >
              <option value="All" style={{ backgroundColor: '#FFFFFF', color: '#0369a1' }}>All</option>
              <option value="P1" style={{ backgroundColor: '#FFFFFF', color: '#DB2777', fontWeight: 'bold' }}>P1</option>
              <option value="P2" style={{ backgroundColor: '#FFFFFF', color: '#2563EB', fontWeight: 'bold' }}>P2</option>
              <option value="P3" style={{ backgroundColor: '#FFFFFF', color: '#16A34A', fontWeight: 'bold' }}>P3</option>
              <option value="P4" style={{ backgroundColor: '#FFFFFF', color: '#16A34A', fontWeight: 'bold' }}>P4</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#475569] font-bold">Severity:</span>
            <select 
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className={`h-9 px-3 outline-none cursor-pointer transition-all font-bold ${
                severityFilter === 'All' 
                  ? 'bg-[#F0F9FF] border border-[#38bdf8] text-[#0369a1] rounded-lg' 
                  : getSeverityBadgeClass(severityFilter)
              }`}
              className="h-9 px-2 rounded-lg bg-[#F8FBFF] border border-[#BFDBFE] text-[#0F172A] font-bold outline-none cursor-pointer"
            >
              <option value="All">All</option>
              <option value="Blocker">Blocker</option>
              <option value="Critical">Critical</option>
              <option value="Major">Major</option>
              <option value="Minor">Minor</option>
            </select>
          </div>
        </div>

        {/* Sort dropdwon */}
        <div className="flex items-center gap-2 text-xs font-bold text-[#475569]">
          <span>Sort by:</span>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-9 px-3 rounded-lg bg-[#F8FBFF] border border-[#BFDBFE] text-[#0F172A] outline-none cursor-pointer"
          >
            <option value="Latest">Latest</option>
            <option value="Priority">Priority</option>
            <option value="Severity">Severity</option>
          </select>
        </div>
      </section>

      {/* DEFECT LIST DIRECTORY GRID TABLE */}
      <section className="bg-white border border-[#BFDBFE] rounded-[24px] shadow-sm overflow-hidden p-2">
        {paginatedBugs.length > 0 ? (
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#BFDBFE]/50 text-[#0F172A] text-xs font-extrabold font-title bg-slate-50/50">
                  <th className="py-4 px-4 rounded-tl-xl">Bug ID</th>
                  <th className="py-4 px-4">Title & Breadcrumbs</th>
                  <th className="py-4 px-4">Severity</th>
                  <th className="py-4 px-4">Priority</th>
                  <th className="py-4 px-4">Assignee</th>
                  <th className="py-4 px-4">Created On</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4 text-right rounded-tr-xl">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedBugs.map((bug) => {
                  const isExpanded = expandedBugId === bug.id;
                  const assignedUser = teamMembers[bug.assignedTo] || { initials: 'U', color: '#64748B' };

                  return (
                    <React.Fragment key={bug.id}>
                      {/* Main row */}
                      <tr 
                        onClick={() => toggleRow(bug.id)}
                        className={`border-b border-[#BFDBFE]/30 hover:bg-[#EEF6FF]/20 transition-colors text-xs text-[#475569] font-semibold cursor-pointer ${
                          isExpanded ? 'bg-[#EEF6FF]/10' : ''
                        }`}
                      >
                        <td className={`py-4 px-4 font-bold font-mono ${getLeftBorderColor(bug.severity, bug.devStatus)}`}>
                          <span className="font-mono text-xs font-extrabold text-[#0284c7] bg-[#0284c7]/10 border border-[#0284c7]/20 px-3 py-1 rounded-lg block text-center">
                            {bug.id}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-bold text-[#0F172A] text-sm block truncate max-w-xs font-title">{bug.title}</span>
                          <span className="text-[11px] text-slate-400 font-semibold mt-1 block truncate">{bug.project} &gt; {bug.module}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`badge px-2 py-0.5 rounded-full font-bold text-[10px] inline-block ${getSeverityBadgeClass(bug.severity)}`}>{bug.severity}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono inline-block ${getPriorityBadgeClass(bug.priority)}`}>{bug.priority}</span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-[9px] text-white shadow-sm" style={{ backgroundColor: assignedUser.color }}>{assignedUser.initials}</div>
                            <span className="text-[#475569] text-xs font-bold">{bug.assignedTo}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 font-mono text-[11px]">{bug.assignedDate}</td>
                        <td className="py-4 px-4">
                          <span className={`badge px-2.5 py-0.5 rounded text-[10px] font-bold inline-block ${getStatusBadgeClass(bug.devStatus)}`}>{bug.devStatus}</span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <button onClick={() => toggleRow(bug.id)} className="p-1.5 text-slate-400 hover:text-[#0F172A]">{isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</button>
                        </td>
                      </tr>
                      
                      {/* Expanded detail row */}
                      {isExpanded && (
                        <tr className="bg-[#F8FBFF]/70 border-b border-[#BFDBFE]/30">
                          <td colSpan={8} className="p-6 rounded-b-xl">
                            <div className="flex flex-col gap-6 animate-fade-in text-left">
                              
                              {/* 1. Complete Form Fields Details in 4-column Grid */}
                              <div className="bg-white p-5 rounded-2xl border border-[#BFDBFE] shadow-sm">
                                <span className="text-[#0F172A] font-bold text-xs uppercase tracking-wider block mb-3 border-b border-[#BFDBFE]/50 pb-2">
                                  Defect Form Details
                                </span>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4 text-xs font-semibold text-[#475569]">
                                  <div>
                                    <span className="text-[#94A3B8] block text-[10px] font-bold uppercase tracking-wider font-mono">Project</span>
                                    <span className="text-[#0F172A] font-bold mt-0.5 block">{bug.project}</span>
                                  </div>
                                  <div>
                                    <span className="text-[#94A3B8] block text-[10px] font-bold uppercase tracking-wider font-mono">Module</span>
                                    <span className="text-[#0F172A] font-bold mt-0.5 block">{bug.module}</span>
                                  </div>
                                  <div>
                                    <span className="text-[#94A3B8] block text-[10px] font-bold uppercase tracking-wider font-mono">Sub Module</span>
                                    <span className="text-[#0F172A] font-bold mt-0.5 block">{bug.subModule || '—'}</span>
                                  </div>
                                  <div>
                                    <span className="text-[#94A3B8] block text-[10px] font-bold uppercase tracking-wider font-mono">Defect Title</span>
                                    <span className="text-[#0F172A] font-bold mt-0.5 block truncate max-w-[200px]" title={bug.title}>{bug.title}</span>
                                  </div>
                                  <div>
                                    <span className="text-[#94A3B8] block text-[10px] font-bold uppercase tracking-wider font-mono">Severity</span>
                                    <span className={`badge px-2 py-0.5 rounded-full font-bold text-[10px] mt-1 inline-block ${getSeverityBadgeClass(bug.severity)}`}>
                                      {bug.severity}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-[#94A3B8] block text-[10px] font-bold uppercase tracking-wider font-mono">Priority</span>
                                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono mt-1 inline-block ${getPriorityBadgeClass(bug.priority)}`}>
                                      {bug.priority}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-[#94A3B8] block text-[10px] font-bold uppercase tracking-wider font-mono">Reported By</span>
                                    <span className="text-[#0F172A] font-bold mt-0.5 block">{bug.assignedBy}</span>
                                  </div>
                                  <div>
                                    <span className="text-[#94A3B8] block text-[10px] font-bold uppercase tracking-wider font-mono">Assigned To</span>
                                    <span className="text-[#0F172A] font-bold mt-0.5 block">{bug.assignedTo}</span>
                                  </div>
                                  <div>
                                    <span className="text-[#94A3B8] block text-[10px] font-bold uppercase tracking-wider font-mono">Logged Date</span>
                                    <span className="text-[#0F172A] font-bold mt-0.5 block">{bug.assignedDate}</span>
                                  </div>
                                  <div>
                                    <span className="text-[#94A3B8] block text-[10px] font-bold uppercase tracking-wider font-mono">Fixed Date</span>
                                    <span className="text-[#0F172A] font-bold mt-0.5 block">{bug.fixedDate || '—'}</span>
                                  </div>
                                  <div className="col-span-2">
                                    <span className="text-[#94A3B8] block text-[10px] font-bold uppercase tracking-wider font-mono">Remarks / Special Notes</span>
                                    <span className="text-[#475569] font-medium mt-0.5 block bg-slate-50 border border-slate-100 p-2 rounded-lg italic">
                                      {bug.remarks || 'No special remarks.'}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Layout columns: Left (description & comments), Right (screenshot & status dropdowns) */}
                              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                                
                                {/* Left column: Spans 7 cols */}
                                <div className="lg:col-span-7 flex flex-col gap-4">
                                  {/* Description */}
                                  <div className="flex flex-col gap-1.5">
                                    <span className="text-[#475569] font-bold text-xs uppercase tracking-wider">Description & Steps:</span>
                                    <p className="text-xs text-[#0F172A] leading-relaxed bg-white p-4 rounded-xl border border-[#BFDBFE]">
                                      {bug.description}
                                    </p>
                                  </div>

                                  {/* Comments thread */}
                                  <div className="flex flex-col gap-3 bg-white p-4 rounded-2xl border border-[#BFDBFE] shadow-sm">
                                    <span className="text-[#475569] font-bold text-xs flex items-center gap-1.5 border-b border-[#BFDBFE]/50 pb-2 mb-2">
                                      <MessageSquare size={13} className="text-[#38BDF8]" />
                                      <span>Resolution Thread ({bug.comments.length})</span>
                                    </span>
                                    
                                    <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
                                      {bug.comments.length > 0 ? (
                                        bug.comments.map((comm, idx) => (
                                          <div key={idx} className="bg-slate-50/70 p-3 rounded-xl border border-[#BFDBFE]/60 text-xs">
                                            <div className="flex justify-between items-center mb-1 text-[9px] text-[#94A3B8]">
                                              <span className="font-bold text-[#0F172A]">{comm.author}</span>
                                              <span className="font-mono">{comm.date}</span>
                                            </div>
                                            <p className="text-[#475569] font-medium">{comm.text}</p>
                                          </div>
                                        ))
                                      ) : (
                                        <p className="text-[#94A3B8] text-xs italic pl-1">No comments documented yet.</p>
                                      )}
                                    </div>

                                    {/* Add inline comment */}
                                    <div className="flex gap-2 mt-3 pt-3 border-t border-[#BFDBFE]/40">
                                      <input 
                                        type="text"
                                        placeholder="Add comment inline..."
                                        value={commentTexts[bug.id] || ''}
                                        onChange={(e) => setCommentTexts({ ...commentTexts, [bug.id]: e.target.value })}
                                        onKeyDown={(e) => {
                                          if (e.key === 'Enter') handleAddComment(bug.id);
                                        }}
                                        className="flex-1 h-9 px-3 rounded-lg border border-[#BFDBFE] text-xs bg-white text-[#0F172A] focus:border-[#38BDF8] outline-none"
                                      />
                                      <button 
                                        onClick={() => handleAddComment(bug.id)}
                                        className="px-3 rounded-lg bg-[#0284c7] text-white font-bold text-xs hover:bg-[#0284c7]/90 transition-all cursor-pointer border-transparent"
                                      >
                                        Send
                                      </button>
                                    </div>
                                  </div>
                                </div>

                                {/* Right column: Spans 5 cols */}
                                <div className="lg:col-span-5 flex flex-col gap-4">
                                  
                                  {/* Dropdowns card */}
                                  <div className="p-4 rounded-2xl bg-white border border-[#BFDBFE] shadow-sm flex flex-col gap-4">
                                    <span className="text-[#0F172A] font-bold text-xs uppercase tracking-wider block border-b border-[#BFDBFE]/50 pb-2">
                                      Update Status Inline
                                    </span>
                                    
                                    <div className="flex flex-col gap-3">
                                      {/* Developer Status */}
                                      <div className="flex flex-col gap-1">
                                        <label className="text-[11px] font-bold text-[#475569] uppercase tracking-wider">Developer Status</label>
                                        <select 
                                          value={bug.devStatus}
                                          onChange={(e) => handleUpdateDevStatus(bug.id, e.target.value)}
                                          className={`h-9 px-3 text-xs font-bold rounded-lg border border-[#BFDBFE] bg-white text-[#0F172A] cursor-pointer focus:border-[#38BDF8] outline-none ${getStatusBadgeClass(bug.devStatus)}`}
                                          style={{ fontWeight: 'bold' }}
                                        >
                                          <option value="Open">Open</option>
                                          <option value="In Progress">In Progress</option>
                                          <option value="Fixed">Fixed</option>
                                          <option value="Invalid">Invalid</option>
                                        </select>
                                      </div>

                                      {/* Tester Status */}
                                      <div className="flex flex-col gap-1">
                                        <label className="text-[11px] font-bold text-[#475569] uppercase tracking-wider">Tester Status</label>
                                        <select 
                                          value={bug.testerStatus}
                                          onChange={(e) => handleUpdateTesterStatus(bug.id, e.target.value)}
                                          className={`h-9 px-3 text-xs font-bold rounded-lg border border-[#BFDBFE] bg-white text-[#0F172A] cursor-pointer focus:border-[#38BDF8] outline-none ${getStatusBadgeClass(bug.testerStatus)}`}
                                          style={{ fontWeight: 'bold' }}
                                        >
                                          <option value="Open">Open</option>
                                          <option value="Assigned">Assigned</option>
                                          <option value="Retesting">Retesting</option>
                                          <option value="Closed">Closed</option>
                                          <option value="Reassigned">Reassigned</option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Screenshot preview */}
                                  {bug.screenshotUrl && (
                                    <div className="p-4 rounded-2xl bg-white border border-[#BFDBFE] shadow-sm flex flex-col gap-2">
                                      <span className="text-[#0F172A] font-bold text-xs uppercase tracking-wider">Screenshot</span>
                                      <div className="rounded-lg overflow-hidden border border-[#BFDBFE] bg-slate-50 relative group">
                                        <img 
                                          src={bug.screenshotUrl} 
                                          alt="Bug Screenshot" 
                                          className="w-full object-cover max-h-[160px] cursor-zoom-in"
                                          onClick={() => window.open(bug.screenshotUrl, '_blank')}
                                        />
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center text-[#475569] bg-white rounded-2xl border border-[#BFDBFE]">
            <AlertOctagon size={24} className="mx-auto text-[#94A3B8] mb-2" />
            <p className="font-bold">No results match your defect search filters.</p>
          </div>
        )}
      </section>

      {/* Pagination Footer */}
      {totalFiltered > 0 && (
        <section className="p-4 px-6 rounded-2xl bg-white border border-[#BFDBFE] flex items-center justify-between flex-wrap gap-4 shadow-sm mt-2">
          <div className="text-xs text-[#475569] font-semibold">
            Showing <span className="font-bold text-[#0F172A]">{startIndex + 1}</span> to{' '}
            <span className="font-bold text-[#0F172A]">
              {Math.min(startIndex + rowsPerPage, totalFiltered)}
            </span>{' '}
            of <span className="font-bold text-[#0F172A]">{totalFiltered}</span> defects
          </div>

          <div className="flex items-center gap-6 flex-wrap">
            {/* Rows Per Page dropdown */}
            <div className="flex items-center gap-2 text-xs font-semibold text-[#475569]">
              <span>Rows per page:</span>
              <select 
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(parseInt(e.target.value));
                  setCurrentPage(1);
                }}
                className="h-8 px-2 rounded-lg bg-[#F8FBFF] border border-[#BFDBFE] text-[#0F172A] font-bold outline-none cursor-pointer"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
            </div>

            {/* Nav Pages buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 rounded-lg border border-[#BFDBFE] bg-[#F8FBFF] text-[#475569] disabled:opacity-40 disabled:hover:bg-[#F8FBFF] hover:bg-[#E0F2FE]/50 transition-all flex items-center justify-center cursor-pointer"
              >
                <ChevronLeft size={14} />
              </button>

              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                const isActive = currentPage === pageNum;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all flex items-center justify-center cursor-pointer ${
                      isActive 
                        ? 'bg-[#0284c7] text-white shadow-md shadow-sky-600/10' 
                        : 'text-[#475569] border border-transparent hover:bg-[#E0F2FE]/50 hover:text-[#0F172A]'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="w-8 h-8 rounded-lg border border-[#BFDBFE] bg-[#F8FBFF] text-[#475569] disabled:opacity-40 disabled:hover:bg-[#F8FBFF] hover:bg-[#E0F2FE]/50 transition-all flex items-center justify-center cursor-pointer"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

// --------------------------------
// RETESTING VIEW COMPONENT
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
    return bugs.filter(b => b.testerStatus === 'Retesting');
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

  // Reassign Bug
  const handleReassignBug = (e, bugId) => {
    e.preventDefault();
    if (!testerComment.trim()) {
      alert('Please provide comments explaining why the bug is being reassigned.');
      return;
    }

    setBugs(bugs.map(b => {
      if (b.id === bugId) {
        const updatedComments = [...b.comments];
        updatedComments.push({
          author: user.name,
          text: `REASSIGNED: ${testerComment.trim()}`,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        });
        return {
          ...b,
          testerStatus: 'Reassigned',
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
      action: `reassigned defect`,
      bugId: bugId,
      timestamp: 'Just now',
      status: 'Reassigned',
      avatarType: 'sync'
    };
    setActivities([newActivity, ...activities]);

    triggerToast(`Defect ${bugId} has been reassigned to Developer.`);
    setTesterComment('');
    setSelectedBugId(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in text-[#475569] module-bg-container">
      <div className="module-bg-overlay" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=1200&q=80")' }} />
      
      {/* Left side list of bugs needing retest (Spans 5 columns) */}
      <div className="lg:col-span-5 p-6 rounded-2xl glass-card flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
        <div className="pb-2 border-b border-[#BFDBFE]/60 flex items-center justify-between">
          <h2 className="text-sm font-bold text-[#0F172A] font-title">QA Retesting Queue</h2>
          <span className="text-[10px] font-bold text-sky-600 bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-500/25">{retestBugs.length} pending</span>
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
                      ? 'border-[#38BDF8] bg-white shadow-[0_8px_30px_rgba(56,189,248,0.08)]' 
                      : 'bg-[#F8FBFF] border border-[#BFDBFE] hover:bg-[#E0F2FE]/50 hover:border-[#38BDF8]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span className="font-mono text-xs font-bold text-[#0284c7]">{bug.id}</span>
                    <span className={`badge px-2 py-0.5 rounded-full text-[8.5px] font-bold ${getSeverityBadgeClass(bug.severity)}`}>
                      {bug.severity}
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-[#0F172A] font-title truncate">{bug.project}</h3>
                  <p className="text-[10px] text-[#475569] truncate mt-0.5">{bug.module} • {bug.subModule}</p>
                  
                  <div className="flex items-center justify-between mt-3 border-t border-[#BFDBFE]/50 pt-2 text-[10px] text-[#94A3B8]">
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
            <div className="py-12 text-center text-[#475569] bg-[#F8FBFF] rounded-xl border border-[#BFDBFE] font-bold">
              Retesting queue empty. All fixed bugs checked.
            </div>
          )}
        </div>
      </div>

      {/* Right side verification control panel (Spans 7 columns) */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        {selectedBug ? (
          <div className="p-6 rounded-2xl glass-card flex flex-col gap-5 animate-scale-up">
            <div className="flex justify-between items-start border-b border-[#BFDBFE]/60 pb-4">
              <div>
                <h2 className="text-base font-bold text-[#0F172A] flex items-center gap-2 font-title">
                  <span>Verify Defect</span>
                  <span className="font-mono text-xs font-semibold text-[#0284c7] bg-[#0284c7]/10 border border-[#0284c7]/20 px-2 py-0.5 rounded">
                    {selectedBug.id}
                  </span>
                </h2>
                <p className="text-xs text-[#475569] mt-1">{selectedBug.project} • {selectedBug.module}</p>
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

            <div className="bg-[#F8FBFF] p-4 rounded-xl border border-[#BFDBFE] flex flex-col gap-2.5">
              <span className="text-[10px] text-[#475569] uppercase font-bold tracking-widest font-mono">Original Description</span>
              <p className="text-xs text-[#0F172A] leading-relaxed font-semibold">{selectedBug.description}</p>
            </div>

            {/* Developer resolution comments */}
            <div className="flex flex-col gap-2 text-xs">
              <span className="text-[#475569] font-bold uppercase tracking-wider">Developer Resolution Thread</span>
              {selectedBug.comments.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {selectedBug.comments.map((comm, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-lg border border-[#BFDBFE]">
                      <div className="flex justify-between items-center mb-1 text-[9px] text-[#94A3B8]">
                        <span className="font-bold text-[#0F172A]">{comm.author}</span>
                        <span>{comm.date}</span>
                      </div>
                      <p className="text-[#475569]">{comm.text}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[#94A3B8] italic pl-1">No developer comments recorded for this ticket.</p>
              )}
            </div>

            {/* QA Testing Operations buttons */}
            <div className="border-t border-[#BFDBFE]/60 pt-5 mt-2">
              <h3 className="text-xs font-bold text-[#0F172A] mb-3 font-title">Tester Verification Actions</h3>
              
              <div className="flex gap-4">
                {/* PASS RETEST */}
                <button 
                  onClick={() => handlePassRetest(selectedBug.id)}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs hover:brightness-110 shadow-lg shadow-emerald-600/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 size={14} />
                  <span>Pass & Close Defect</span>
                </button>
              </div>

              <div className="my-6 h-px bg-[#BFDBFE]/60" />

              {/* REASSIGN BUG FORM */}
              <form onSubmit={(e) => handleReassignBug(e, selectedBug.id)} className="flex flex-col gap-3">
                <label className="text-sm font-semibold text-[#475569]">Reassignment Notes / Reason</label>
                <textarea 
                  value={testerComment}
                  onChange={(e) => setTesterComment(e.target.value)}
                  placeholder="Explain exactly why this bug is being reassigned back to the developer..."
                  className="w-full h-24 p-3 text-sm rounded-xl bg-white border border-[#BFDBFE] text-[#0F172A] placeholder-[#94A3B8] focus:bg-[#F8FBFF] focus:border-[#38bdf8] outline-none"
                />
                <button 
                  type="submit"
                  className="py-3 px-4 rounded-xl border border-[#fb923c]/20 hover:border-[#fb923c]/35 bg-[#fb923c]/10 text-[#fb923c] hover:text-[#fdba74] text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RefreshCw size={14} />
                  <span>Mark as Reassigned</span>
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="py-20 text-center text-[#475569] bg-[#F8FBFF] border border-[#BFDBFE] rounded-2xl flex flex-col items-center justify-center p-6">
            <Sliders size={32} className="text-[#94A3B8] mb-2" />
            <h3 className="font-bold text-[#0F172A] font-title">Select verification target</h3>
            <p className="text-xs text-[#475569] mt-1 max-w-xs">Select a defect from the pending verification queue on the left to pass or reassign.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// --------------------------------
// BUG DETAIL VIEW COMPONENT
// --------------------------------
function BugDetailView({
  bugId,
  bugs,
  setBugs,
  activities,
  setActivities,
  user,
  triggerToast,
  setActiveTab,
  getSeverityBadgeClass,
  getPriorityBadgeClass,
  getStatusBadgeClass,
  teamMembers
}) {
  const bug = useMemo(() => {
    return bugs.find(b => b.id === bugId) || null;
  }, [bugs, bugId]);

  const [editDevStatus, setEditDevStatus] = useState('');
  const [editComment, setEditComment] = useState('');

  // Update form fields when bug changes
  React.useEffect(() => {
    if (bug) {
      setEditDevStatus(bug.devStatus);
      setEditComment('');
    }
  }, [bug]);

  if (!bug) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center text-[#475569] bg-white border border-[#BFDBFE] rounded-3xl p-8 animate-fade-in">
        <AlertCircle size={40} className="text-slate-400 mb-3" />
        <h3 className="text-lg font-bold text-[#0F172A] font-title">Bug Not Found</h3>
        <p className="text-xs text-[#94A3B8] mt-1 max-w-xs">The requested defect details could not be loaded. It may have been deleted or does not exist.</p>
        <button 
          onClick={() => setActiveTab('My Assigned Bugs')}
          className="mt-5 py-2 px-4 rounded-xl bg-[#0284c7] hover:bg-[#0284c7]/90 text-white text-xs font-bold transition-all cursor-pointer"
        >
          Back to My Assigned Bugs
        </button>
      </div>
    );
  }

  const handleSaveUpdate = (e) => {
    e.preventDefault();
    
    setBugs(bugs.map(b => {
      if (b.id === bug.id) {
        const updatedComments = [...b.comments];
        if (editComment.trim()) {
          updatedComments.push({
            author: user.name,
            text: editComment.trim(),
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
          });
        }
        
        let newTesterStatus = b.testerStatus;
        let newFixedDate = b.fixedDate;
        
        if (editDevStatus === 'Fixed') {
          newTesterStatus = 'Retesting';
          newFixedDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        } else {
          newTesterStatus = 'Assigned';
        }

        return {
          ...b,
          devStatus: editDevStatus,
          testerStatus: newTesterStatus,
          fixedDate: newFixedDate,
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
      action: `updated Developer Status to "${editDevStatus}"`,
      bugId: bug.id,
      timestamp: 'Just now',
      status: editDevStatus === 'Fixed' ? 'Fixed' : editDevStatus === 'In Progress' ? 'In Progress' : 'Open',
      avatarType: editDevStatus === 'Fixed' ? 'check' : 'user'
    };
    setActivities([newActivity, ...activities]);

    triggerToast(`Successfully updated developer status for ${bug.id}`);
    setEditComment('');
    setActiveTab('My Assigned Bugs');
  };

  return (
    <div className="flex flex-col gap-6 md:gap-8 animate-fade-in text-[#475569] module-bg-container pb-10">
      <div className="module-bg-overlay" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80")' }} />
      
      {/* Header with Title and Breadcrumb */}
      <div className="flex justify-between items-start flex-wrap gap-4 border-b border-[#BFDBFE]/60 pb-5">
        <div className="flex flex-col gap-2 min-w-0">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-[#0284c7] bg-[#E0F2FE] border border-[#BFDBFE] px-2.5 py-1 rounded">
              {bug.id}
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono ${getPriorityBadgeClass(bug.priority)}`}>
              Priority: {bug.priority}
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono ${getSeverityBadgeClass(bug.severity)}`}>
              Severity: {bug.severity}
            </span>
          </div>
          <h2 className="text-3xl font-extrabold text-[#0F172A] font-title mt-1 leading-tight break-words" title={bug.title}>
            {bug.title}
          </h2>
          <div className="flex items-center gap-2 text-xs text-[#64748B] font-semibold mt-1">
            <Briefcase size={12} />
            <span>{bug.project}</span>
            <span>•</span>
            <Folder size={12} />
            <span>{bug.module}</span>
            {bug.subModule && (
              <>
                <span>•</span>
                <span>{bug.subModule}</span>
              </>
            )}
          </div>
        </div>

        <button 
          onClick={() => setActiveTab('My Assigned Bugs')}
          className="py-2.5 px-4 rounded-xl border border-[#BFDBFE] hover:border-[#38BDF8] bg-white text-[#475569] hover:text-[#0284c7] text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <span>← Back to Assigned Bugs</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-scale-up">
        {/* Left Column: Bug Information (Spans 7 columns) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Description Section */}
          <div className="p-6 rounded-3xl bg-white border border-[#BFDBFE] shadow-sm flex flex-col gap-4">
            <h3 className="text-sm font-extrabold text-[#0F172A] uppercase tracking-wider font-title flex items-center gap-2">
              <FileText size={16} className="text-[#38BDF8]" />
              <span>Description</span>
            </h3>
            <div className="text-sm text-[#475569] leading-relaxed whitespace-pre-wrap bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0]">
              {bug.description || "No description provided."}
            </div>
          </div>

          {/* Screenshot Preview Card */}
          {bug.screenshotUrl && (
            <div className="p-6 rounded-3xl bg-white border border-[#BFDBFE] shadow-sm flex flex-col gap-4">
              <h3 className="text-sm font-extrabold text-[#0F172A] uppercase tracking-wider font-title flex items-center gap-2">
                <Sparkles size={16} className="text-[#38BDF8]" />
                <span>Attached Screenshot</span>
              </h3>
              <div className="rounded-2xl overflow-hidden border border-[#BFDBFE] bg-slate-50 relative group">
                <img 
                  src={bug.screenshotUrl} 
                  alt="Defect Attachment" 
                  className="w-full object-cover max-h-[350px] transition-transform duration-500 group-hover:scale-[1.01]" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
              </div>
            </div>
          )}

          {/* Timeline & Comments Thread */}
          <div className="p-6 rounded-3xl bg-white border border-[#BFDBFE] shadow-sm flex flex-col gap-5">
            <h3 className="text-sm font-extrabold text-[#0F172A] uppercase tracking-wider font-title flex items-center gap-2">
              <MessageSquare size={16} className="text-[#38BDF8]" />
              <span>Resolution Comments Thread</span>
            </h3>
            
            <div className="flex flex-col gap-4">
              {bug.comments && bug.comments.length > 0 ? (
                bug.comments.map((comm, idx) => {
                  const authorInfo = teamMembers[comm.author] || { initials: comm.author ? comm.author.charAt(0) : '?', color: '#64748B' };
                  return (
                    <div key={idx} className="flex gap-3 items-start bg-slate-50 border border-[#E2E8F0] p-4 rounded-2xl">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs text-white font-bold shrink-0" 
                        style={{ backgroundColor: authorInfo.color }}
                      >
                        {authorInfo.initials}
                      </div>
                      <div className="flex flex-col gap-1 min-w-0 flex-1">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-[#0F172A]">{comm.author}</span>
                          <span className="text-[#94A3B8] font-mono">{comm.date}</span>
                        </div>
                        <p className="text-xs text-[#475569] leading-relaxed mt-1 whitespace-pre-wrap">{comm.text}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 text-xs text-[#94A3B8] italic bg-slate-50 border border-dashed border-[#BFDBFE] rounded-2xl">
                  No resolution notes or developer comments have been posted yet.
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Right Column: Developer Actions Card (Spans 5 columns) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="p-6 rounded-3xl bg-white border border-[#BFDBFE] shadow-sm flex flex-col gap-6 sticky top-6">
            <div className="border-b border-[#BFDBFE]/60 pb-4">
              <h3 className="text-lg font-extrabold text-[#0F172A] font-title flex items-center gap-2">
                <Sliders size={18} className="text-[#38BDF8]" />
                <span>Developer Actions</span>
              </h3>
              <p className="text-xs text-[#64748B] mt-1">Resolve this defect or update progress status metrics.</p>
            </div>

            <form onSubmit={handleSaveUpdate} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#475569] uppercase tracking-wider">Developer Status</label>
                <select 
                  value={editDevStatus}
                  onChange={(e) => setEditDevStatus(e.target.value)}
                  className="w-full h-11 px-4 text-xs rounded-xl bg-white border border-[#BFDBFE] text-[#0F172A] focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20 outline-none cursor-pointer transition-all"
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Fixed">Fixed</option>
                  <option value="Invalid">Invalid</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#475569] uppercase tracking-wider">Fix Notes / Comments</label>
                <textarea 
                  value={editComment}
                  onChange={(e) => setEditComment(e.target.value)}
                  placeholder="Provide detailed fix information, troubleshooting steps, or explanation of status updates..."
                  className="w-full min-h-[140px] p-4 text-xs rounded-xl bg-white border border-[#BFDBFE] text-[#0F172A] placeholder-[#94A3B8] focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20 outline-none transition-all resize-none"
                />
              </div>

              <div className="h-px bg-[#BFDBFE]/40 my-1" />

              <div className="flex gap-3">
                <button 
                  type="button"
                  onClick={() => setActiveTab('My Assigned Bugs')}
                  className="flex-1 h-11 rounded-xl text-[#475569] font-bold border border-[#BFDBFE] hover:bg-slate-50 transition-all text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 h-11 rounded-xl bg-gradient-to-r from-[#38bdf8] to-[#22d3ee] text-black font-bold hover:brightness-105 transition-all text-xs shadow-md shadow-sky-600/10 cursor-pointer"
                >
                  Save Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// --------------------------------
// MY ASSIGNED BUGS VIEW COMPONENT
// --------------------------------
function MyAssignedBugsView({ 
  bugs, 
  user,
  onSelectBug,
  getSeverityBadgeClass,
  getPriorityBadgeClass,
  getStatusBadgeClass
}) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter bugs for the logged in developer
  const myBugs = useMemo(() => {
    return bugs.filter(b => b.assignedTo === user.name);
  }, [bugs, user.name]);

  // Filter based on search query
  const filteredBugs = useMemo(() => {
    return myBugs.filter(bug => {
      const q = searchQuery.toLowerCase();
      return (
        bug.id.toLowerCase().includes(q) ||
        (bug.title && bug.title.toLowerCase().includes(q)) ||
        bug.project.toLowerCase().includes(q) ||
        bug.module.toLowerCase().includes(q) ||
        (bug.subModule && bug.subModule.toLowerCase().includes(q)) ||
        bug.description.toLowerCase().includes(q)
      );
    });
  }, [myBugs, searchQuery]);

  return (
    <div className="flex flex-col gap-6 md:gap-8 animate-fade-in text-[#475569] module-bg-container pb-10">
      <div className="module-bg-overlay" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80")' }} />
      
      {/* Header and Search */}
      <div className="flex justify-between items-center flex-wrap gap-4 border-b border-[#BFDBFE]/60 pb-5">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-extrabold text-[#0F172A] font-title">My Assigned Defects</h2>
          <p className="text-sm text-[#475569] mt-1">Track and resolve bugs allocated directly to you.</p>
        </div>
        
        {/* Search */}
        <div className="relative w-80">
          <Search size={14} className="absolute left-4 top-3.5 text-[#94A3B8]" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search assigned bugs..."
            className="w-full h-10 pl-11 pr-4 rounded-xl bg-white border border-[#BFDBFE] text-xs text-[#0F172A] placeholder-[#94A3B8] focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20 outline-none transition-all"
          />
        </div>
      </div>

      {/* Grid Layout of cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-scale-up">
        {filteredBugs.length > 0 ? (
          filteredBugs.map(bug => (
            <div 
              key={bug.id}
              onClick={() => onSelectBug(bug.id)}
              className="p-6 rounded-3xl bg-white border border-[#BFDBFE] hover:border-[#38BDF8] shadow-sm hover:shadow-[#38BDF8]/10 hover:scale-[1.02] transition-all cursor-pointer flex flex-col justify-between gap-5 relative overflow-hidden group min-h-[220px]"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex flex-col gap-1.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#0284c7] bg-[#E0F2FE] border border-[#BFDBFE] px-2 py-0.5 rounded">
                      {bug.id}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold font-mono ${getPriorityBadgeClass(bug.priority)}`}>
                      {bug.priority}
                    </span>
                  </div>
                  <span className="font-extrabold text-[#0F172A] text-lg font-title mt-2 truncate group-hover:text-[#0284c7] transition-colors" title={bug.title}>
                    {bug.title || bug.project}
                  </span>
                  <p className="text-xs text-[#475569] font-bold uppercase tracking-wider font-mono mt-1">
                    {bug.project} • {bug.module} {bug.subModule && `• ${bug.subModule}`}
                  </p>
                </div>
              </div>

              <div className="h-px bg-[#BFDBFE]/40 my-1" />

              <div className="flex items-center justify-between gap-3 text-xs flex-wrap">
                {/* Severity Badge */}
                <span className={`badge px-2.5 py-0.5 rounded-full font-bold text-[10px] ${getSeverityBadgeClass(bug.severity)}`}>
                  {bug.severity}
                </span>

                {/* Status Badges */}
                <div className="flex gap-1.5">
                  <span className={`badge px-2.5 py-0.5 rounded text-[10px] font-bold ${getStatusBadgeClass(bug.devStatus)}`} title="Developer Status">
                    Dev: {bug.devStatus}
                  </span>
                  <span className={`badge px-2.5 py-0.5 rounded text-[10px] font-bold ${getStatusBadgeClass(bug.testerStatus)}`} title="Tester Status">
                    QA: {bug.testerStatus}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-16 text-center text-slate-500 bg-white border border-[#BFDBFE] rounded-2xl w-full">
            <AlertOctagon size={24} className="mx-auto text-slate-400 mb-2" />
            <p className="font-bold">No assigned bugs found matching search criteria.</p>
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
    <div className="flex flex-col gap-8 animate-fade-in text-[#475569] module-bg-container">
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
                  ? 'border-[#38BDF8] bg-white shadow-[0_8px_30px_rgba(56,189,248,0.08)]' 
                  : 'glass-card glass-card-hover hover:border-[#38BDF8]'
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
                  <h3 className="font-bold text-[#0F172A] font-title text-sm">{dev.name}</h3>
                  <span className="text-[10px] text-[#475569] font-bold uppercase tracking-wider">{profile.role}</span>
                </div>
              </div>

              {/* Progress workload bar */}
              <div className="flex flex-col gap-1 text-[10px] text-[#475569]">
                <div className="flex justify-between items-center font-medium">
                  <span>Workload Index</span>
                  <span className="font-mono font-bold text-[#0F172A]">{activePercent}%</span>
                </div>
                <div className="h-1.5 w-full bg-[#EEF6FF] border border-[#BFDBFE]/50 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500" style={{ width: `${Math.min(100, activePercent)}%` }} />
                </div>
              </div>

              {/* Counts stats grid */}
              <div className="grid grid-cols-3 gap-2 border-t border-[#BFDBFE]/60 pt-3 text-center text-xs">
                <div>
                  <span className="text-[9px] text-[#475569] block font-semibold uppercase">Active</span>
                  <span className="text-[#0F172A] font-extrabold block mt-0.5">{dev.active}</span>
                </div>
                <div>
                  <span className="text-[9px] text-[#475569] block font-semibold uppercase">To Fix</span>
                  <span className="text-[#0284c7] font-extrabold block mt-0.5">{dev.toFix}</span>
                </div>
                <div>
                  <span className="text-[9px] text-[#475569] block font-semibold uppercase">Closed</span>
                  <span className="text-emerald-600 font-extrabold block mt-0.5">{dev.closed}</span>
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
            <div className="flex justify-between items-start border-b border-[#BFDBFE]/60 pb-4">
              <div className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white select-none text-xs"
                  style={{ backgroundColor: teamMembers[selectedWorkloadMember]?.color }}
                >
                  {teamMembers[selectedWorkloadMember]?.initials}
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#0F172A] font-title">{selectedWorkloadMember}'s Ticket Board</h2>
                  <p className="text-xs text-[#475569] font-mono mt-0.5">{teamMembers[selectedWorkloadMember]?.email}</p>
                </div>
              </div>
              
              {/* Internal metrics categories tab selector */}
              <div className="flex gap-1.5 bg-[#F8FBFF] p-1 rounded-xl border border-[#BFDBFE]">
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
                        ? 'bg-gradient-to-r from-[#38bdf8] to-[#0284c7] text-white shadow-md shadow-sky-400/10' 
                        : 'text-[#475569] hover:text-[#0F172A]'
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
                    className="p-4 rounded-xl bg-[#F8FBFF] border border-[#BFDBFE] hover:bg-[#E0F2FE]/50 hover:border-[#38BDF8] transition-all cursor-pointer flex flex-col justify-between gap-3 group shadow-sm"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs font-bold text-[#0284c7] bg-[#0284c7]/10 border border-[#0284c7]/20 px-2 py-0.5 rounded">
                          {bug.id}
                        </span>
                        <div>
                          <span className="text-xs font-bold text-[#0F172A] block truncate max-w-[150px]" title={bug.title || bug.project}>{bug.title || bug.project}</span>
                          <span className="text-[10px] text-[#475569] block truncate max-w-[150px] mt-0.5">{bug.module}</span>
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
                    <p className="text-xs text-[#475569] leading-relaxed font-medium truncate group-hover:text-[#0F172A] transition-colors">
                      {bug.description}
                    </p>
                    <div className="flex justify-between items-center text-[9px] text-[#94A3B8] border-t border-[#BFDBFE]/50 pt-2 mt-1 font-bold">
                      <span>Logged: {bug.assignedDate}</span>
                      <span className="text-[#0284c7] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                        <span>Open details</span>
                        <ArrowRight size={10} />
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 py-10 text-center text-[#475569] font-bold bg-[#F8FBFF] border border-[#BFDBFE] rounded-xl">
                  No tickets match this category in the developer's assignment queue.
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="py-16 text-center text-[#475569] bg-[#F8FBFF] border border-[#BFDBFE] rounded-2xl flex flex-col items-center justify-center p-6">
            <Users size={30} className="text-[#94A3B8] mb-2" />
            <h3 className="font-bold text-[#0F172A] font-title">Select Team Member</h3>
            <p className="text-xs text-[#475569] mt-1">Select any developer card above to explore their active workload and resolved logs.</p>
          </div>
        )}
      </section>
    </div>
  );
}

// --------------------------------
// PROJECTS VIEW COMPONENT
// --------------------------------
function ProjectsView({ 
  bugs, 
  projectsList, 
  PROJECT_MODULES, 
  MODULE_SUBMODULES, 
  onAddProject, 
  getSeverityBadgeClass, 
  getStatusBadgeClass, 
  getPriorityBadgeClass,
  onLinkToBug,
  setActiveTab,
  selectedProject,
  setSelectedProject,
  selectedModule,
  setSelectedModule,
  selectedSubModule,
  setSelectedSubModule
}) {

  const [showAddModal, setShowAddModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newModuleName, setNewModuleName] = useState('');
  const [newSubModuleName, setNewSubModuleName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Projects level mapping
  const projectSummaries = useMemo(() => {
    let list = projectsList.map(proj => {
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

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(item => 
        item.name.toLowerCase().includes(q) || 
        (item.desc && item.desc.toLowerCase().includes(q))
      );
    }
    return list;
  }, [bugs, projectsList, PROJECT_MODULES, searchQuery]);

  // 2. Modules level mapping
  const moduleSummaries = useMemo(() => {
    if (!selectedProject) return [];
    const modules = PROJECT_MODULES[selectedProject] || [];
    let list = modules.map(mod => {
      const modBugs = bugs.filter(b => b.project === selectedProject && b.module === mod);
      const total = modBugs.length;
      const active = modBugs.filter(b => b.testerStatus !== 'Closed').length;
      const critical = modBugs.filter(b => b.severity === 'Critical' && b.testerStatus !== 'Closed').length;
      const closed = modBugs.filter(b => b.testerStatus === 'Closed').length;

      return {
        name: mod,
        total,
        active,
        critical,
        closed,
        submodules: MODULE_SUBMODULES[mod] || []
      };
    });

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(item => item.name.toLowerCase().includes(q));
    }
    return list;
  }, [bugs, selectedProject, PROJECT_MODULES, MODULE_SUBMODULES, searchQuery]);

  // 3. Sub Modules level mapping
  const subModuleSummaries = useMemo(() => {
    if (!selectedModule) return [];
    const subs = MODULE_SUBMODULES[selectedModule] || [];
    let list = subs.map(sub => {
      const subBugs = bugs.filter(b => b.project === selectedProject && b.module === selectedModule && b.subModule === sub);
      const total = subBugs.length;
      const active = subBugs.filter(b => b.testerStatus !== 'Closed').length;
      const critical = subBugs.filter(b => b.severity === 'Critical' && b.testerStatus !== 'Closed').length;
      const closed = subBugs.filter(b => b.testerStatus === 'Closed').length;

      return {
        name: sub,
        total,
        active,
        critical,
        closed
      };
    });

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(item => item.name.toLowerCase().includes(q));
    }
    return list;
  }, [bugs, selectedProject, selectedModule, MODULE_SUBMODULES, searchQuery]);

  // 4. Bugs under selected Sub Module for Level 4
  const selectedBugsList = useMemo(() => {
    if (!selectedSubModule) return [];
    let list = bugs.filter(b => b.project === selectedProject && b.module === selectedModule && b.subModule === selectedSubModule);

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(bug => 
        bug.id.toLowerCase().includes(q) ||
        (bug.title && bug.title.toLowerCase().includes(q)) ||
        (bug.description && bug.description.toLowerCase().includes(q)) ||
        (bug.assignedTo && bug.assignedTo.toLowerCase().includes(q)) ||
        (bug.devStatus && bug.devStatus.toLowerCase().includes(q)) ||
        (bug.testerStatus && bug.testerStatus.toLowerCase().includes(q))
      );
    }
    return list;
  }, [bugs, selectedProject, selectedModule, selectedSubModule, searchQuery]);

  const handleOpenAddModal = () => {
    setNewProjectName(selectedProject || '');
    setNewModuleName(selectedModule || '');
    setNewSubModuleName('');
    setShowAddModal(true);
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    const p = newProjectName.trim();
    const m = newModuleName.trim();
    const s = newSubModuleName.trim();

    if (!p || !m) {
      alert("Project Name and Module Name are required.");
      return;
    }

    onAddProject(p, m, s);
    setNewProjectName('');
    setNewModuleName('');
    setNewSubModuleName('');
    setShowAddModal(false);

    // Auto navigate focus
    setSelectedProject(p);
    setSelectedModule(m);
    if (s) {
      setSelectedSubModule(s);
    } else {
      setSelectedSubModule(null);
    }
  };

  return (
    <div className="flex flex-col gap-6 md:gap-8 animate-fade-in text-[#475569] module-bg-container pb-10">
      <div className="module-bg-overlay" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80")' }} />
      
      {/* BREADCRUMBS & TOP BAR */}
      <div className="flex justify-between items-center flex-wrap gap-4 border-b border-[#BFDBFE]/60 pb-5">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-extrabold text-[#0F172A] font-title">
            {selectedSubModule ? 'Sub Module Details' : selectedModule ? 'Module Details' : selectedProject ? 'Project Details' : 'Projects Directory'}
          </h2>
          
          <div className="flex items-center gap-2 mt-2 text-xs font-bold uppercase tracking-wider text-[#475569] select-none flex-wrap">
            <button 
              onClick={() => {
                setSelectedProject(null);
                setSelectedModule(null);
                setSelectedSubModule(null);
                setSearchQuery('');
              }}
              className={`hover:text-[#0284c7] transition-colors ${!selectedProject ? 'text-[#0284c7] font-extrabold' : ''}`}
            >
              Projects
            </button>
            
            {selectedProject && (
              <>
                <ChevronRight size={12} className="text-[#BFDBFE]" />
                <button 
                  onClick={() => {
                    setSelectedModule(null);
                    setSelectedSubModule(null);
                    setSearchQuery('');
                  }}
                  className={`hover:text-[#0284c7] transition-colors ${!selectedModule ? 'text-[#0284c7] font-extrabold' : 'text-[#0F172A]'}`}
                >
                  {selectedProject}
                </button>
              </>
            )}

            {selectedModule && (
              <>
                <ChevronRight size={12} className="text-[#BFDBFE]" />
                <button 
                  onClick={() => {
                    setSelectedSubModule(null);
                    setSearchQuery('');
                  }}
                  className={`hover:text-[#0284c7] transition-colors ${!selectedSubModule ? 'text-[#0284c7] font-extrabold' : 'text-[#0F172A]'}`}
                >
                  {selectedModule}
                </button>
              </>
            )}

            {selectedSubModule && (
              <>
                <ChevronRight size={12} className="text-[#BFDBFE]" />
                <span className="text-[#0284c7] font-extrabold font-mono normal-case">
                  {selectedSubModule}
                </span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                selectedSubModule 
                  ? "Search defects..." 
                  : selectedModule 
                    ? "Search sub modules..." 
                    : selectedProject 
                      ? "Search modules..." 
                      : "Search projects..."
              }
              className="h-11 w-64 pl-10 pr-9 rounded-xl bg-white border border-[#BFDBFE] text-[#0F172A] text-sm font-semibold placeholder-[#94A3B8] focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20 outline-none transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-0.5 rounded-full hover:bg-slate-100 cursor-pointer border-none"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {!selectedProject && (
            <button
              type="button"
              onClick={handleOpenAddModal}
              className="h-11 px-5 rounded-xl bg-gradient-to-r from-[#0284c7] to-[#38bdf8] text-white font-bold hover:brightness-105 shadow-md shadow-sky-500/10 hover:shadow-sky-500/20 transition-all text-sm flex items-center gap-2 cursor-pointer border-transparent"
            >
              <PlusCircle size={16} />
              <span>Add Project / Module</span>
            </button>
          )}
        </div>
      </div>

      {/* RENDER CONTENT DIRECTORY */}
      {/* 1. Projects List View */}
      {!selectedProject && (
        projectSummaries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-scale-up">
            {projectSummaries.map((item, idx) => (
              <div 
                key={idx} 
                onClick={() => setSelectedProject(item.name)}
                className="p-4 md:p-5 rounded-2xl bg-white border border-[#BFDBFE] hover:border-[#38BDF8] shadow-sm hover:shadow-md hover:scale-[1.02] transition-all cursor-pointer flex flex-col justify-between gap-4 relative overflow-hidden group min-h-[190px]"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex flex-col gap-1 min-w-0">
                    <span className="font-extrabold text-[#0F172A] text-lg md:text-xl font-title truncate group-hover:text-[#0284c7] transition-colors">{item.name}</span>
                    <p className="text-base text-[#475569] leading-relaxed mt-1 font-semibold line-clamp-2">{item.desc}</p>
                  </div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border font-extrabold text-lg flex-shrink-0 ${item.iconBg || 'bg-blue-500/10 border-blue-500/20 text-blue-400'}`}>
                    {item.name[0]}
                  </div>
                </div>

                {/* Module counts */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[13px] text-slate-400 uppercase font-extrabold font-mono tracking-wider">Modules ({item.modules.length})</span>
                  <div className="flex gap-2 flex-wrap">
                    {item.modules.length > 0 ? (
                      item.modules.slice(0, 2).map((m, i) => (
                        <span key={i} className="px-2.5 py-1 text-[13px] font-bold rounded-lg bg-[#E0F2FE] border border-[#BFDBFE]/65 text-[#0284c7]">
                          {m}
                        </span>
                      ))
                    ) : (
                      <span className="text-[13px] text-slate-450 italic font-semibold">No modules registered</span>
                    )}
                    {item.modules.length > 2 && (
                      <span className="px-2.5 py-1 text-[13px] font-bold rounded-lg bg-slate-100 border border-slate-200 text-slate-500">
                        +{item.modules.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="h-px bg-[#BFDBFE]/40" />

                {/* Metrics breakdown */}
                <div className="grid grid-cols-4 gap-2 text-center text-sm font-semibold">
                  <div>
                    <span className="text-[13px] text-slate-400 block uppercase font-bold">Total</span>
                    <span className="text-[#0F172A] text-lg font-extrabold block mt-1 font-mono">{item.total}</span>
                  </div>
                  <div>
                    <span className="text-[13px] text-slate-400 block uppercase font-bold">Active</span>
                    <span className="text-[#0284c7] text-lg font-extrabold block mt-1 font-mono">{item.active}</span>
                  </div>
                  <div>
                    <span className="text-[13px] text-red-500 block uppercase font-bold">Critical</span>
                    <span className="text-red-600 text-lg font-extrabold block mt-1 font-mono">{item.critical}</span>
                  </div>
                  <div>
                    <span className="text-[13px] text-emerald-500 block uppercase font-bold">Closed</span>
                    <span className="text-emerald-600 text-lg font-extrabold block mt-1 font-mono">{item.closed}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-slate-500 bg-white border border-[#BFDBFE] rounded-2xl w-full flex flex-col items-center justify-center p-6 animate-scale-up shadow-sm">
            <AlertOctagon size={32} className="text-slate-400 mb-2" />
            <h3 className="font-extrabold text-[#0F172A] text-lg font-title">No projects found</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-sm">No registered projects match your search query "<strong>{searchQuery}</strong>". Try searching for a different keyword or reset the search.</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-4 px-4 py-2 text-xs font-bold rounded-lg border border-[#38bdf8] text-[#0284c7] bg-[#f0f9ff] hover:bg-[#bae6fd]/30 transition-all cursor-pointer outline-none"
            >
              Reset Search
            </button>
          </div>
        )
      )}

      {/* 2. Modules List View */}
      {selectedProject && !selectedModule && (
        moduleSummaries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-scale-up">
            {moduleSummaries.map((item, idx) => (
              <div 
                key={idx}
                onClick={() => setSelectedModule(item.name)}
                className="p-4 md:p-5 rounded-2xl bg-white border border-[#BFDBFE] hover:border-[#38BDF8] shadow-sm hover:shadow-md hover:scale-[1.02] transition-all cursor-pointer flex flex-col justify-between gap-4 relative overflow-hidden group min-h-[175px]"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex flex-col gap-1 min-w-0">
                    <span className="font-extrabold text-[#0F172A] text-lg md:text-xl font-title truncate group-hover:text-[#0284c7] transition-colors">{item.name}</span>
                    <span className="text-base text-[#0284c7] font-bold mt-1 font-mono uppercase tracking-wider">MODULE</span>
                  </div>
                  <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[#0284c7] font-bold">
                    {item.name[0]}
                  </div>
                </div>

                {/* Submodule counts */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[13px] text-slate-400 uppercase font-extrabold font-mono tracking-wider">Sub Modules ({item.submodules.length})</span>
                  <div className="flex gap-2 flex-wrap">
                    {item.submodules.length > 0 ? (
                      item.submodules.slice(0, 2).map((sub, i) => (
                        <span key={i} className="px-2.5 py-1 text-[13px] font-bold rounded-lg bg-[#F0FDF4] border border-[#BBF7D0] text-[#166534]">
                          {sub}
                        </span>
                      ))
                    ) : (
                      <span className="text-[13px] text-slate-450 italic font-semibold">No sub-modules registered</span>
                    )}
                    {item.submodules.length > 2 && (
                      <span className="px-2.5 py-1 text-[13px] font-bold rounded-lg bg-slate-100 border border-slate-200 text-slate-500">
                        +{item.submodules.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="h-px bg-[#BFDBFE]/40" />

                {/* Metrics */}
                <div className="grid grid-cols-4 gap-2 text-center text-sm font-semibold">
                  <div>
                    <span className="text-[13px] text-slate-400 block uppercase font-bold">Total</span>
                    <span className="text-[#0F172A] text-lg font-extrabold block mt-1 font-mono">{item.total}</span>
                  </div>
                  <div>
                    <span className="text-[13px] text-slate-400 block uppercase font-bold">Active</span>
                    <span className="text-[#0284c7] text-lg font-extrabold block mt-1 font-mono">{item.active}</span>
                  </div>
                  <div>
                    <span className="text-[13px] text-red-500 block uppercase font-bold">Critical</span>
                    <span className="text-red-600 text-lg font-extrabold block mt-1 font-mono">{item.critical}</span>
                  </div>
                  <div>
                    <span className="text-[13px] text-emerald-500 block uppercase font-bold">Closed</span>
                    <span className="text-emerald-600 text-lg font-extrabold block mt-1 font-mono">{item.closed}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-slate-500 bg-white border border-[#BFDBFE] rounded-2xl w-full flex flex-col items-center justify-center p-6 animate-scale-up shadow-sm">
            <AlertOctagon size={32} className="text-slate-400 mb-2" />
            <h3 className="font-extrabold text-[#0F172A] text-lg font-title">No modules found</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-sm">No registered modules match your search query "<strong>{searchQuery}</strong>" under project <strong>{selectedProject}</strong>.</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-4 px-4 py-2 text-xs font-bold rounded-lg border border-[#38bdf8] text-[#0284c7] bg-[#f0f9ff] hover:bg-[#bae6fd]/30 transition-all cursor-pointer outline-none"
            >
              Reset Search
            </button>
          </div>
        )
      )}

      {/* 3. Sub Modules List View */}
      {selectedProject && selectedModule && !selectedSubModule && (
        subModuleSummaries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-scale-up">
            {subModuleSummaries.map((item, idx) => (
              <div 
                key={idx}
                onClick={() => setSelectedSubModule(item.name)}
                className="p-4 md:p-5 rounded-2xl bg-white border border-[#BFDBFE] hover:border-[#38BDF8] shadow-sm hover:shadow-md hover:scale-[1.02] transition-all cursor-pointer flex flex-col justify-between gap-4 relative overflow-hidden group min-h-[140px]"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex flex-col gap-1 min-w-0">
                    <span className="font-extrabold text-[#0F172A] text-lg md:text-xl font-title truncate group-hover:text-[#0284c7] transition-colors">{item.name}</span>
                    <span className="text-base text-emerald-600 font-bold mt-1 font-mono uppercase tracking-wider">SUB MODULE</span>
                  </div>
                  <div className="w-9 h-9 rounded-lg bg-emerald-55 border border-emerald-100 flex items-center justify-center text-[#166534] font-bold">
                    {item.name[0]}
                  </div>
                </div>

                <div className="h-px bg-[#BFDBFE]/40" />

                {/* Metrics */}
                <div className="grid grid-cols-4 gap-2 text-center text-sm font-semibold">
                  <div>
                    <span className="text-[13px] text-slate-400 block uppercase font-bold">Total</span>
                    <span className="text-[#0F172A] text-lg font-extrabold block mt-1 font-mono">{item.total}</span>
                  </div>
                  <div>
                    <span className="text-[13px] text-slate-400 block uppercase font-bold">Active</span>
                    <span className="text-[#0284c7] text-lg font-extrabold block mt-1 font-mono">{item.active}</span>
                  </div>
                  <div>
                    <span className="text-[13px] text-red-500 block uppercase font-bold">Critical</span>
                    <span className="text-red-600 text-lg font-extrabold block mt-1 font-mono">{item.critical}</span>
                  </div>
                  <div>
                    <span className="text-[13px] text-emerald-500 block uppercase font-bold">Closed</span>
                    <span className="text-emerald-600 text-lg font-extrabold block mt-1 font-mono">{item.closed}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-slate-500 bg-white border border-[#BFDBFE] rounded-2xl w-full flex flex-col items-center justify-center p-6 animate-scale-up shadow-sm">
            <AlertOctagon size={32} className="text-slate-400 mb-2" />
            <h3 className="font-extrabold text-[#0F172A] text-lg font-title">No sub modules found</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-sm">No registered sub modules match your search query "<strong>{searchQuery}</strong>" under module <strong>{selectedModule}</strong>.</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-4 px-4 py-2 text-xs font-bold rounded-lg border border-[#38bdf8] text-[#0284c7] bg-[#f0f9ff] hover:bg-[#bae6fd]/30 transition-all cursor-pointer outline-none"
            >
              Reset Search
            </button>
          </div>
        )
      )}

      {/* 4. Bugs Table View */}
      {selectedProject && selectedModule && selectedSubModule && (
        <div className="glass-card rounded-3xl p-6 bg-white border border-[#BFDBFE] shadow-sm animate-scale-up overflow-hidden">
          <div className="flex justify-between items-center flex-wrap gap-4 pb-4 border-b border-[#BFDBFE]/60 mb-5">
            <div>
              <h3 className="text-lg font-extrabold text-[#0F172A] font-title flex items-center gap-2">
                <span className="w-1.5 h-3.5 rounded bg-[#38bdf8]" />
                Registered Defects ({selectedBugsList.length})
              </h3>
              <p className="text-xs text-slate-450 mt-0.5">Defects matching project: {selectedProject} ➜ {selectedModule} ➜ {selectedSubModule}</p>
            </div>
            {selectedBugsList.length > 0 && (
              <button 
                onClick={() => {
                  setActiveTab('Create Bug');
                }}
                className="h-10 px-5 rounded-xl border border-[#38bdf8] text-[#0284c7] font-bold text-xs bg-[#f0f9ff] hover:bg-[#bae6fd]/30 transition-all cursor-pointer"
              >
                + Register Defect
              </button>
            )}
          </div>

          {selectedBugsList.length > 0 ? (
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#BFDBFE]/60 text-[#475569] text-xs font-extrabold font-title bg-slate-50/50">
                    <th className="py-3.5 px-4 font-extrabold">Bug ID</th>
                    <th className="py-3.5 px-4 font-extrabold">Title</th>
                    <th className="py-3.5 px-4 font-extrabold">Severity</th>
                    <th className="py-3.5 px-4 font-extrabold">Priority</th>
                    <th className="py-3.5 px-4 font-extrabold">Assigned To</th>
                    <th className="py-3.5 px-4 font-extrabold">Dev Status</th>
                    <th className="py-3.5 px-4 font-extrabold">Tester Status</th>
                    <th className="py-3.5 px-4 font-extrabold">Assigned Date</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedBugsList.map((bug, index) => (
                    <tr 
                      key={bug.id} 
                      className={`border-b border-[#BFDBFE]/30 hover:bg-[#EEF6FF]/20 transition-colors text-xs ${
                        index === 0 
                          ? 'text-[#0F172A] font-bold bg-[#E0F2FE]/20' 
                          : 'text-[#475569] font-semibold'
                      }`}
                    >
                      <td className="py-4 px-4 font-bold font-mono">
                        <button 
                          onClick={() => onLinkToBug(bug.id)}
                          className="text-[#0284c7] hover:underline font-bold text-left cursor-pointer outline-none"
                        >
                          {bug.id}
                        </button>
                      </td>
                      <td className="py-4 px-4 text-[#0F172A] font-bold max-w-xs truncate" title={bug.title}>{bug.title}</td>
                      <td className="py-4 px-4">
                        <span className={`badge px-2 py-0.5 rounded-full text-[10px] font-bold ${getSeverityBadgeClass(bug.severity)}`}>
                          {bug.severity}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`badge px-2 py-0.5 rounded-full text-[10px] font-bold ${getPriorityBadgeClass(bug.priority)}`}>
                          {bug.priority}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-[#0F172A]">{bug.assignedTo}</td>
                      <td className="py-4 px-4">
                        <span className={`badge px-2.5 py-0.5 rounded text-[10px] font-bold ${getStatusBadgeClass(bug.devStatus)}`}>
                          {bug.devStatus}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`badge px-2.5 py-0.5 rounded text-[10px] font-bold ${getStatusBadgeClass(bug.testerStatus)}`}>
                          {bug.testerStatus}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-mono text-[11px] text-slate-450">{bug.assignedDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-16 text-center bg-[#F8FBFF] border-2 border-dashed border-[#BFDBFE]/70 rounded-2xl flex flex-col items-center justify-center p-6 text-slate-450 animate-scale-up">
              <Sliders size={32} className="text-[#38BDF8] mb-2" />
              <h4 className="font-bold text-[#0F172A] font-title text-sm">No defects found</h4>
              <p className="text-xs text-slate-450 mt-1 max-w-xs leading-relaxed">No defects are currently registered under this sub-module layer.</p>
              <button 
                onClick={() => {
                  setActiveTab('Create Bug');
                }}
                className="mt-4 h-10 px-5 rounded-xl bg-gradient-to-r from-[#0284c7] to-[#38bdf8] text-white font-bold text-xs hover:brightness-105 shadow-sm transition-all cursor-pointer border-transparent"
              >
                + Register First Defect
              </button>
            </div>
          )}
        </div>
      )}

      {/* ADD NEW PROJECT/STRUCTURE MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
          <div 
            className="absolute inset-0"
            onClick={() => setShowAddModal(false)}
          />
          <div className="relative w-full max-w-[520px] p-8 bg-white border border-[#E2EEFC] rounded-[28px] shadow-[0_16px_48px_rgba(191,219,254,0.25)] flex flex-col gap-6 animate-scale-up z-10 text-[#0F172A]">
            <div className="flex justify-between items-center pb-2 border-b border-[#BFDBFE]/50">
              <div>
                <h3 className="text-xl md:text-2xl font-extrabold text-[#0F172A] font-title">Add Project Structure</h3>
                <p className="text-sm text-slate-500 mt-1">Define project, module, and sub-module layers.</p>
              </div>
              <button 
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-all border border-transparent hover:border-slate-200 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleModalSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-4">
                {/* Project Input */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-[#475569] pl-0.5">Project Name <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    placeholder="e.g. IoT Dashboard"
                    className="h-11 px-4 rounded-xl bg-white border border-[#BFDBFE] text-[#0F172A] text-sm font-semibold placeholder-[#94A3B8] focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20 outline-none transition-all"
                    required
                  />
                </div>

                {/* Module Input */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-[#475569] pl-0.5">New Module <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    value={newModuleName}
                    onChange={(e) => setNewModuleName(e.target.value)}
                    placeholder="e.g. Sensors"
                    className="h-11 px-4 rounded-xl bg-white border border-[#BFDBFE] text-[#0F172A] text-sm font-semibold placeholder-[#94A3B8] focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20 outline-none transition-all"
                    required
                  />
                </div>

                {/* Sub Module Input */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-[#475569] pl-0.5">New Sub Module <span className="text-slate-400 font-medium">(Optional)</span></label>
                  <input 
                    type="text" 
                    value={newSubModuleName}
                    onChange={(e) => setNewSubModuleName(e.target.value)}
                    placeholder="e.g. Telemetry"
                    className="h-11 px-4 rounded-xl bg-white border border-[#BFDBFE] text-[#0F172A] text-sm font-semibold placeholder-[#94A3B8] focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-[#BFDBFE]/50">
                <button 
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 h-12 rounded-xl text-slate-500 font-bold border border-[#BFDBFE] hover:bg-slate-50 transition-all text-sm bg-white cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 h-12 rounded-xl bg-gradient-to-r from-[#0284c7] to-[#38bdf8] text-white font-bold hover:brightness-110 shadow-md shadow-sky-500/10 hover:shadow-sky-500/20 transition-all text-sm cursor-pointer border-transparent"
                >
                  Save Structure
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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
    <div className="flex flex-col gap-6 md:gap-8 animate-fade-in text-[#475569] module-bg-container">
      <div className="module-bg-overlay" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80")' }} />
      
      {/* Analytics Summary */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Resolve rate Ring gauge */}
        <div className="p-6 rounded-2xl glass-card flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-[#475569] uppercase tracking-wider">Defect Resolve Rate</span>
            <span className="text-3.5xl font-extrabold text-[#0F172A] font-title mt-1">{resolveRate}%</span>
            <span className="text-[10px] text-[#475569] mt-1 font-bold">Passed verification QA</span>
          </div>
          <div className="relative w-16 h-16 select-none flex-shrink-0 flex items-center justify-center">
            <svg className="w-16 h-16 transform -rotate-90">
              <circle cx="32" cy="32" r="26" className="stroke-[#BFDBFE]/40" strokeWidth="5" fill="transparent" />
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
            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-extrabold font-mono text-[#0284c7]">{resolveRate}%</span>
          </div>
        </div>

        {/* Backlog size widget */}
        <div className="p-6 rounded-2xl glass-card flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-[#475569] uppercase tracking-wider">Backlog Defect Volume</span>
            <span className="text-3.5xl font-extrabold text-[#0F172A] font-title mt-1">{metrics.active}</span>
            <span className="text-[10px] text-orange-400 font-semibold mt-1">Requiring QA action</span>
          </div>
          <div className="w-11 h-11 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/5">
            <AlertCircle size={20} />
          </div>
        </div>

        {/* Avg cycle SLA widget */}
        <div className="p-6 rounded-2xl glass-card flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-[#475569] uppercase tracking-wider">Avg Resolution Cycle</span>
            <span className="text-3.5xl font-extrabold text-[#0F172A] font-title mt-1">1.8d</span>
            <span className="text-[10px] text-emerald-600 font-semibold mt-1">Pipeline health normal</span>
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
            <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider font-title">Severity Allocation</h3>
            <p className="text-xs text-[#475569] mt-0.5">Critical defects vs visual alerts index.</p>
          </div>

          <div className="flex-1 min-h-[220px] flex items-end justify-around border-b border-[#BFDBFE]/60 pb-4 relative mt-2">
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
                  <span className="text-[10px] font-bold text-[#0F172A] font-mono bg-white border border-[#BFDBFE] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                    {item.count}
                  </span>
                  <div 
                    className={`w-9 bg-gradient-to-t ${barColor} rounded-t-lg transition-all duration-500`}
                    style={{ height: `${barHt}px`, filter: `drop-shadow(0 0 6px ${shadowColor})` }}
                  />
                  <span className="text-[10px] font-bold text-[#475569] uppercase mt-1 tracking-wider">{item.severity}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Project workloads distribution list */}
        <div className="p-6 rounded-2xl glass-card flex flex-col gap-5">
          <div>
            <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider font-title">Workspace Defect Load</h3>
            <p className="text-xs text-[#475569] mt-0.5">Resolved vs unresolved active volume.</p>
          </div>

          <div className="flex flex-col gap-4 mt-2">
            {projectDistribution.map((item, idx) => {
              const rate = item.total === 0 ? 0 : Math.round((item.resolved / item.total) * 100);
              return (
                <div key={idx} className="flex flex-col gap-1.5 text-xs">
                  <div className="flex justify-between items-center text-[#475569] font-medium">
                    <span className="font-bold text-[#0F172A]">{item.project}</span>
                    <span className="font-mono">
                      {item.resolved} fixed / {item.total} total <span className="text-[#0284c7] ml-2 font-bold">{rate}%</span>
                    </span>
                  </div>
                  <div className="h-2 w-full bg-[#EEF6FF] border border-[#BFDBFE]/50 rounded-full overflow-hidden">
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
    <div className="max-w-[1440px] mx-auto w-full animate-fade-in flex flex-col gap-6 text-[#475569] module-bg-container">
      <div className="module-bg-overlay" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80")' }} />
      <div className="border-b border-[#BFDBFE]/60 pb-4">
        <h2 className="text-lg font-bold text-[#0F172A] font-title">Preferences</h2>
        <p className="text-xs text-[#475569] mt-1">Configure workspace API profiles, token registers, and alerts thresholds.</p>
      </div>

      {/* Sub tabs list */}
      <section className="flex gap-2 border-b border-[#BFDBFE]/60 pb-px text-sm font-bold uppercase tracking-wider font-title">
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
          <form onSubmit={handleSaveProfile} className="flex flex-col gap-5 max-w-2xl">
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
              <label className="text-sm font-semibold text-[#475569] pl-1">Full Display Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11 px-4 rounded-xl bg-white border border-[#BFDBFE] text-[#0F172A] text-sm outline-none focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20 transition-all"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#475569] pl-1">API Mail Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 px-4 rounded-xl bg-white border border-[#BFDBFE] text-[#0F172A] text-sm outline-none focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20 transition-all"
                required
              />
            </div>

            <div className="pt-2">
              <button 
                type="submit" 
                className="h-11 px-7 rounded-xl bg-gradient-to-r from-[#38BDF8] to-[#7DD3FC] text-[#0F172A] font-bold hover:brightness-110 shadow-lg shadow-sky-400/20 transition-all text-sm"
              >
                Save Profile Configuration
              </button>
            </div>
          </form>
        )}

        {activeSubTab === 'Workspace' && (
          <div className="flex flex-col gap-5 max-w-2xl">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#475569] pl-1">Organization Tenant</label>
              <input 
                type="text" 
                defaultValue="QA MIND Systems Ltd"
                disabled
                className="h-11 px-4 rounded-xl bg-slate-50 border border-[#BFDBFE] text-[#94A3B8] text-sm cursor-not-allowed"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#475569] pl-1">Workspace Tenant ID</label>
              <input 
                type="text" 
                defaultValue="qamind.io/global-production-workspace-node-1"
                disabled
                className="h-11 px-4 rounded-xl bg-slate-50 border border-[#BFDBFE] text-[#94A3B8] text-sm cursor-not-allowed"
              />
            </div>
            <p className="text-[#94A3B8] text-xs italic">* Global variables locks administered via tenant config controls.</p>
          </div>
        )}

        {activeSubTab === 'Alerts' && (
          <div className="flex flex-col gap-4 max-w-2xl bg-white p-5 rounded-2xl border border-[#BFDBFE] shadow-sm">
            <h3 className="text-sm font-bold text-[#0F172A] font-title mb-2 uppercase tracking-wider">Alert Notification Thresholds</h3>
            
            <div className="flex items-center justify-between py-2 border-b border-[#BFDBFE]/50">
              <div>
                <span className="text-sm font-semibold text-[#0F172A] block">Immediate Hotfix Toast Alerts</span>
                <span className="text-xs text-[#94A3B8] block mt-0.5">Display UI notification immediately when P1 bug is reported.</span>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#38BDF8] text-white border border-[#BFDBFE] rounded focus:ring-0 cursor-pointer" />
            </div>

            <div className="flex items-center justify-between py-2 border-b border-[#BFDBFE]/50">
              <div>
                <span className="text-sm font-semibold text-[#0F172A] block">Defect Assigned Email Notifications</span>
                <span className="text-xs text-[#94A3B8] block mt-0.5">Send a workspace mail check digest to developer instantly.</span>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#38BDF8] text-white border border-[#BFDBFE] rounded focus:ring-0 cursor-pointer" />
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <span className="text-sm font-semibold text-[#0F172A] block">Weekly Sprint Velocity Summaries</span>
                <span className="text-xs text-[#94A3B8] block mt-0.5">Compile resolution stats to email digest.</span>
              </div>
              <input type="checkbox" className="w-4 h-4 accent-[#38BDF8] text-white border border-[#BFDBFE] rounded focus:ring-0 cursor-pointer" />
            </div>
          </div>
        )}

        {activeSubTab === 'Security' && (
          <div className="flex flex-col gap-5 max-w-2xl">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#475569] pl-1">QA MIND API Integration Token Key</label>
              <div className="flex gap-2">
                <input 
                  type="password" 
                  defaultValue="••••••••••••••••••••••••••••••••••••"
                  disabled
                  className="flex-1 h-11 px-4 rounded-xl bg-slate-50 border border-[#BFDBFE] text-[#94A3B8] text-sm cursor-not-allowed font-mono"
                />
                <button 
                  type="button" 
                  onClick={() => triggerToast('Security Integration Client Key copied!')}
                  className="h-11 px-4 rounded-xl border border-[#BFDBFE] bg-white text-[#475569] hover:bg-[#E0F2FE]/50 hover:text-[#0F172A] transition-all text-sm font-bold"
                >
                  Copy Key
                </button>
              </div>
            </div>
            <p className="text-[#94A3B8] text-xs leading-relaxed">
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
  formTitle,
  setFormTitle,
  formDescription,
  setFormDescription,
  formPriority,
  setFormPriority,
  formSeverity,
  setFormSeverity,
  formAssignedTo,
  setFormAssignedTo,
  formRemarks,
  setFormRemarks,
  formScreenshot,
  setFormScreenshot,
  previewUrl,
  setPreviewUrl,
  nextBugId,
  loggedInUser,
  onSubmit,
  onClear,
  onCancel,
  PROJECT_MODULES,
  MODULE_SUBMODULES,
  onAddProject,
  teamMembers,
  getSeverityBadgeClass,
  getPriorityBadgeClass
}) {
  const fileInputRef = React.useRef(null);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newModuleName, setNewModuleName] = useState('');
  const [newSubModuleName, setNewSubModuleName] = useState('');
  const [validationError, setValidationError] = useState('');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [aiSuggestedSeverity, setAiSuggestedSeverity] = useState(null);
  const [aiSuggestedPriority, setAiSuggestedPriority] = useState(null);

  const developers = useMemo(() => {
    return Object.entries(teamMembers || {})
      .filter(([name, member]) => {
        const role = (member.role || '').toLowerCase();
        return role.includes('dev') || role.includes('developer') || role.includes('full stack') || role.includes('software');
      })
      .map(([name]) => name);
  }, [teamMembers]);

  const handleEnhanceDescription = () => {
    const descVal = formDescription.trim();

    if (!descVal) {
      setValidationError("Please enter a bug description first.");
      return;
    }

    setIsEnhancing(true);

    setTimeout(() => {
      const spellingCorrections = {
        "colr": "color",
        "mesage": "message",
        "wrking": "working",
        "issu": "issue",
        "insted": "instead",
        "succes": "success",
        "sucess": "success",
        "logut": "logout",
        "eror": "error",
        "db": "database"
      };

      const correctSpelling = (str) => {
        if (!str) return "";
        return str.split(/\b/).map(word => {
          const lower = word.toLowerCase();
          if (spellingCorrections[lower]) {
            const correction = spellingCorrections[lower];
            if (word.charAt(0) === word.charAt(0).toUpperCase()) {
              return correction.charAt(0).toUpperCase() + correction.slice(1);
            }
            return correction;
          }
          return word;
        }).join('');
      };

      const correctedDesc = correctSpelling(descVal);
      const normalized = descVal.toLowerCase().replace(/[\s\.\,\-\_]+/g, ' ').trim();

      let finalTitle = "";
      let finalDesc = "";
      let severity = "Major";
      let priority = "Medium";

      // Match exact scenarios and key variations
      if (normalized === "change ui colr" || normalized === "change ui color") {
        finalTitle = "UI Color Update Required";
        finalDesc = "Change the UI color to improve visual consistency.";
        severity = "Minor";
        priority = "Low";
      } else if (normalized === "login button not wrking" || normalized === "login button not working" || 
                 (normalized.includes('login') && normalized.includes('button') && (normalized.includes('not working') || normalized.includes('not wrking') || normalized.includes('not functioning')))) {
        finalTitle = "Login Button Not Functioning";
        finalDesc = "The Login button is not functioning as expected.";
        severity = "Critical";
        priority = "High";
      } else if (normalized === "logout mesage showing after login" || normalized === "logout message showing after login" || normalized === "logout mesage showing after loging" ||
                 (normalized.includes('login') && normalized.includes('logout') && (normalized.includes('mesage') || normalized.includes('message')))) {
        finalTitle = "Incorrect Message Displayed After Login";
        finalDesc = "A logout message is displayed after a successful login.";
        severity = "Major";
        priority = "Medium";
      } else {
        // Fallback Grammar & Spelling correction
        let polished = correctedDesc.trim();
        // Capitalize first letter
        polished = polished.charAt(0).toUpperCase() + polished.slice(1);
        if (!/[.!?]$/.test(polished)) {
          polished += ".";
        }

        // Professional phrasing adjustments
        polished = polished
          .replace(/not working/gi, "is not functioning as expected")
          .replace(/failing/gi, "fails to complete successfully")
          .replace(/crash/gi, "encounters an unexpected crash")
          .replace(/slow/gi, "performance is slow");

        finalDesc = polished;

        // Generate short Bug Title based on description (first 4 words)
        const cleanTitleBase = correctedDesc.replace(/[.!?]/g, '').trim();
        const words = cleanTitleBase.split(/\s+/);
        let titleWords = words.slice(0, 4);
        finalTitle = titleWords.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');

        // Classification
        const lowerDesc = polished.toLowerCase();
        if (lowerDesc.includes('crash') || lowerDesc.includes('fatal') || lowerDesc.includes('blocker') || lowerDesc.includes('security') || lowerDesc.includes('leak') || lowerDesc.includes('prevent') || lowerDesc.includes('auth')) {
          severity = "Critical";
          priority = "High";
        } else if (lowerDesc.includes('typo') || lowerDesc.includes('alignment') || lowerDesc.includes('cosmetic') || lowerDesc.includes('color') || lowerDesc.includes('visual')) {
          severity = "Minor";
          priority = "Low";
        } else {
          severity = "Major";
          priority = "Medium";
        }
      }

      setFormTitle(finalTitle);
      setFormDescription(finalDesc);
      setFormSeverity(severity);
      setFormPriority(priority);
      setAiSuggestedSeverity(severity);
      setAiSuggestedPriority(priority);

      setValidationError('');
      setIsEnhancing(false);
    }, 1200);
  };

  React.useEffect(() => {
    if (formTitle.trim() && formDescription.trim() && formAssignedTo.trim()) {
      setValidationError('');
    } else if (formDescription.trim() && validationError === "Please enter a bug description first.") {
      setValidationError('');
    }
  }, [formTitle, formDescription, formAssignedTo, validationError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formTitle.trim() || !formDescription.trim() || !formAssignedTo.trim()) {
      setValidationError('please fill the mandatory fields');
      alert('please fill the mandatory fields');
      return;
    }
    setValidationError('');
    setAiSuggestedSeverity(null);
    setAiSuggestedPriority(null);
    onSubmit(e);
  };

  const handleClear = () => {
    setValidationError('');
    setAiSuggestedSeverity(null);
    setAiSuggestedPriority(null);
    onClear();
  };

  const handleCancel = () => {
    setValidationError('');
    setAiSuggestedSeverity(null);
    setAiSuggestedPriority(null);
    onCancel();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormScreenshot(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setFormScreenshot(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveFile = () => {
    setFormScreenshot(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl('');
  };

  const currentDate = new Date().toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });

  return (
    <div className="max-w-[1440px] mx-auto w-full animate-fade-in text-[#475569] module-bg-container pb-10">
      <div className="module-bg-overlay" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80")' }} />
      <div className="border-b border-[#BFDBFE]/60 pb-4 mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-[#0F172A] font-title">Create New Defect</h2>
          <p className="text-sm text-[#475569] mt-1">Register high-fidelity QA bug details into active developer queues.</p>
        </div>
        <button
          type="button"
          onClick={() => setShowAddProjectModal(true)}
          className="h-12 px-6 rounded-xl bg-gradient-to-r from-[#0284c7] to-[#38bdf8] text-white font-bold hover:brightness-105 shadow-md shadow-sky-500/10 hover:shadow-sky-500/20 transition-all text-sm flex items-center gap-2 cursor-pointer border-transparent"
        >
          <PlusCircle size={16} />
          <span>Add Project</span>
        </button>
      </div>

      {validationError && (
        <div className="p-4 rounded-2xl bg-[#FEF2F2] border border-[#FECACA] text-[#991B1B] text-sm font-bold flex items-center gap-3 animate-fade-in mb-6">
          <AlertCircle className="text-[#EF4444] flex-shrink-0" size={20} />
          <span>{validationError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* LEFT COLUMN: Main Form details */}
          <div className="flex flex-col gap-8">
            
            {/* CARD 1: PROJECT DETAILS */}
            <div className="glass-card rounded-3xl p-8 flex flex-col gap-6 shadow-sm">
              <div className="pb-3 border-b border-[#BFDBFE]/60 flex items-center justify-between">
                <h3 className="text-lg font-extrabold text-[#0F172A] font-title flex items-center gap-2">
                  <span className="w-1.5 h-3.5 rounded bg-[#38bdf8]" />
                  PROJECT DETAILS
                </h3>
                <span className="text-xs text-red-500 font-bold">* Required fields</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Project */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-base font-bold text-[#475569]">
                    Project <span className="text-red-500">*</span>
                  </label>
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
                    className="h-14 px-5 rounded-xl bg-white border border-[#BFDBFE] text-[#0F172A] text-base font-semibold cursor-pointer outline-none focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20 transition-colors"
                  >
                    {Object.keys(PROJECT_MODULES).map(proj => (
                      <option key={proj} value={proj}>{proj}</option>
                    ))}
                  </select>
                </div>

                {/* Module */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-base font-bold text-[#475569]">
                    Module <span className="text-red-500">*</span>
                  </label>
                  <select 
                    value={formModule}
                    onChange={(e) => {
                      const mod = e.target.value;
                      setFormModule(mod);
                      const avSubs = MODULE_SUBMODULES[mod] || [];
                      setFormSubModule(avSubs[0] || '');
                    }}
                    className="h-14 px-5 rounded-xl bg-white border border-[#BFDBFE] text-[#0F172A] text-base font-semibold cursor-pointer outline-none focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20 transition-colors"
                  >
                    {PROJECT_MODULES[formProject]?.map(mod => (
                      <option key={mod} value={mod}>{mod}</option>
                    ))}
                  </select>
                </div>

                {/* Sub Module */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-base font-bold text-[#475569]">
                    Sub Module <span className="text-red-500">*</span>
                  </label>
                  <select 
                    value={formSubModule}
                    onChange={(e) => setFormSubModule(e.target.value)}
                    className="h-14 px-5 rounded-xl bg-white border border-[#BFDBFE] text-[#0F172A] text-base font-semibold cursor-pointer outline-none focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20 transition-colors"
                  >
                    {MODULE_SUBMODULES[formModule]?.map(sub => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* CARD 2: BUG DETAILS */}
            <div className="glass-card rounded-3xl p-8 flex flex-col gap-6 shadow-sm">
              <div className="pb-3 border-b border-[#BFDBFE]/60">
                <h3 className="text-lg font-extrabold text-[#0F172A] font-title flex items-center gap-2">
                  <span className="w-1.5 h-3.5 rounded bg-[#38bdf8]" />
                  BUG DETAILS
                </h3>
              </div>

              <div className="flex flex-col gap-4">
                {/* Bug ID & Title */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="flex flex-col gap-1.5 sm:col-span-1">
                    <label className="text-base font-bold text-[#475569]">Bug ID</label>
                    <input 
                      type="text" 
                      value={nextBugId} 
                      disabled
                      className="h-14 px-5 rounded-xl bg-slate-50 border border-[#BFDBFE] text-slate-500 text-base font-mono font-bold cursor-not-allowed outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 sm:col-span-3">
                    <label className="text-base font-bold text-[#475569]">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      placeholder="e.g. Checkout gateway crashes on Android UPI callbacks"
                      className="h-14 px-5 rounded-xl bg-white border border-[#BFDBFE] text-[#0F172A] text-base font-semibold placeholder-[#94A3B8] focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20 outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-base font-bold text-[#475569]">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea 
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value.slice(0, 1000))}
                    placeholder="Enter detailed bug description, steps to reproduce, actual vs expected results..."
                    className="w-full min-h-[160px] p-4 text-base rounded-xl bg-white border border-[#BFDBFE] text-[#0F172A] placeholder-[#94A3B8] focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20 outline-none resize-y transition-colors leading-relaxed"
                    maxLength={1000}
                    required
                  />
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-[#94A3B8] font-bold">
                      {formDescription.length} / 1000 Characters
                    </span>
                    <button
                      type="button"
                      disabled={isEnhancing}
                      onClick={handleEnhanceDescription}
                      className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 cursor-pointer select-none bg-gradient-to-r from-[#0284c7] to-[#38bdf8] text-white hover:brightness-105 disabled:opacity-60 disabled:cursor-not-allowed shadow-md shadow-sky-500/10 hover:shadow-sky-500/20 border-transparent"
                    >
                      {isEnhancing ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin flex-shrink-0" />
                          <span>✨ Enhancing description...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles size={15} className="text-[#e0f2fe] flex-shrink-0" />
                          <span>✨ Polish This Bug</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 3: CLASSIFICATION */}
            <div className="glass-card rounded-3xl p-8 flex flex-col gap-6 shadow-sm">
              <div className="pb-3 border-b border-[#BFDBFE]/60">
                <h3 className="text-lg font-extrabold text-[#0F172A] font-title flex items-center gap-2">
                  <span className="w-1.5 h-3.5 rounded bg-[#38bdf8]" />
                  CLASSIFICATION
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Severity */}
                <div className="flex flex-col gap-1.5 w-full max-w-[160px]">
                  <label className="text-base font-bold text-[#475569]">
                    Severity <span className="text-red-500">*</span>
                  </label>
                  <select 
                    value={formSeverity}
                    onChange={(e) => setFormSeverity(e.target.value)}
                    className={`h-9 px-4 cursor-pointer outline-none transition-all text-sm shadow-sm w-full max-w-[160px] ${getSeverityBadgeClass(formSeverity)}`}
                    style={{ color: '#000000', fontWeight: 'bold' }}
                  >
                    <option value="Blocker" style={{ backgroundColor: '#FFFFFF', color: '#000000', fontWeight: 'bold' }}>Blocker</option>
                    <option value="Critical" style={{ backgroundColor: '#FFFFFF', color: '#000000', fontWeight: 'bold' }}>Critical</option>
                    <option value="Major" style={{ backgroundColor: '#FFFFFF', color: '#000000', fontWeight: 'bold' }}>Major</option>
                    <option value="Minor" style={{ backgroundColor: '#FFFFFF', color: '#000000', fontWeight: 'bold' }}>Minor</option>
                  </select>
                </div>

                {/* Priority */}
                <div className="flex flex-col gap-1.5 w-full max-w-[160px]">
                  <label className="text-base font-bold text-[#475569]">
                    Priority <span className="text-red-500">*</span>
                  </label>
                  <select 
                    value={formPriority}
                    onChange={(e) => setFormPriority(e.target.value)}
                    className={`h-9 px-4 cursor-pointer outline-none transition-all text-sm shadow-sm w-full max-w-[160px] ${getPriorityBadgeClass(formPriority)}`}
                    style={{ color: '#000000', fontWeight: 'bold' }}
                  >
                    <option value="High" style={{ backgroundColor: '#FFFFFF', color: '#000000', fontWeight: 'bold' }}>High</option>
                    <option value="Medium" style={{ backgroundColor: '#FFFFFF', color: '#000000', fontWeight: 'bold' }}>Medium</option>
                    <option value="Low" style={{ backgroundColor: '#FFFFFF', color: '#000000', fontWeight: 'bold' }}>Low</option>
                  </select>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Assignment & Attachments */}
          <div className="flex flex-col gap-8">
            
            {/* CARD 4: ASSIGNMENT DETAILS */}
            <div className="glass-card rounded-3xl p-8 flex flex-col gap-6 shadow-sm">
              <div className="pb-3 border-b border-[#BFDBFE]/60">
                <h3 className="text-lg font-extrabold text-[#0F172A] font-title flex items-center gap-2">
                  <span className="w-1.5 h-3.5 rounded bg-[#38bdf8]" />
                  ASSIGNMENT DETAILS
                </h3>
              </div>

              <div className="flex flex-col gap-4">
                {/* Assigned By & Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-base font-bold text-[#475569]">Assigned By</label>
                    <input 
                      type="text" 
                      value={loggedInUser}
                      disabled
                      className="h-14 px-5 rounded-xl bg-slate-50 border border-[#BFDBFE] text-[#94A3B8] text-base font-bold cursor-not-allowed outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-base font-bold text-[#475569]">Assigned Date</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={currentDate}
                        disabled
                        className="h-14 pl-5 pr-10 rounded-xl bg-slate-50 border border-[#BFDBFE] text-[#94A3B8] text-base font-bold cursor-not-allowed w-full outline-none"
                      />
                      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={18} />
                    </div>
                  </div>
                </div>

                {/* Assigned To */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-base font-bold text-[#475569]">
                    Assigned To <span className="text-red-500">*</span>
                  </label>
                  <select 
                    value={formAssignedTo}
                    onChange={(e) => setFormAssignedTo(e.target.value)}
                    className="h-14 px-5 rounded-xl bg-white border border-[#BFDBFE] text-[#0F172A] text-base font-semibold focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20 outline-none transition-colors cursor-pointer"
                    required
                  >
                    <option value="" disabled className="text-[#94A3B8]">Select developer...</option>
                    {developers.map(devName => (
                      <option key={devName} value={devName}>
                        {devName} ({teamMembers[devName]?.username || devName.toLowerCase().replace(/\s/g, '')})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* CARD 5: ADDITIONAL INFORMATION */}
            <div className="glass-card rounded-3xl p-8 flex flex-col gap-6 shadow-sm">
              <div className="pb-3 border-b border-[#BFDBFE]/60">
                <h3 className="text-lg font-extrabold text-[#0F172A] font-title flex items-center gap-2">
                  <span className="w-1.5 h-3.5 rounded bg-[#38bdf8]" />
                  ADDITIONAL INFORMATION
                </h3>
              </div>

              <div className="flex flex-col gap-4">
                {/* Remarks */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-base font-bold text-[#475569]">Remarks</label>
                  <textarea 
                    value={formRemarks}
                    onChange={(e) => setFormRemarks(e.target.value)}
                    placeholder="Provide initial troubleshooting context, logs snippets, or environment parameters..."
                    className="w-full min-h-[110px] p-4 text-base rounded-xl bg-white border border-[#BFDBFE] text-[#0F172A] placeholder-[#94A3B8] focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20 outline-none resize-y transition-colors leading-relaxed"
                  />
                </div>

                {/* Screenshot Upload Drag-and-Drop */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-base font-bold text-[#475569]">Screenshot Upload</label>
                  
                  {!previewUrl ? (
                    <div 
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-[#BFDBFE] hover:border-[#38BDF8] bg-[#F8FBFF] hover:bg-[#E0F2FE]/30 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer group"
                    >
                      <input 
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                      />
                      <div className="w-12 h-12 rounded-full bg-[#E0F2FE] flex items-center justify-center text-[#38bdf8] group-hover:scale-110 transition-transform">
                        <UploadCloud size={24} />
                      </div>
                      <div className="text-center select-none">
                        <span className="text-sm font-bold text-[#0F172A] block">
                          Drag & drop image here, or <span className="text-[#38BDF8] underline">browse files</span>
                        </span>
                        <span className="text-xs text-[#94A3B8] block mt-1">Supports PNG, JPG, JPEG, GIF up to 5MB</span>
                      </div>
                    </div>
                  ) : (
                    <div className="border border-[#BFDBFE] rounded-2xl p-4 bg-[#F8FBFF] flex flex-col gap-3 relative animate-scale-up">
                      <div className="flex items-center justify-between text-sm pb-2 border-b border-[#BFDBFE]/60">
                        <span className="font-semibold text-[#0f172a] truncate max-w-[80%]">
                          {formScreenshot ? formScreenshot.name : 'Screenshot Attachment'}
                        </span>
                        <button 
                          type="button"
                          onClick={handleRemoveFile}
                          className="text-red-500 hover:text-red-600 font-bold transition-colors cursor-pointer text-sm"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="relative rounded-xl overflow-hidden border border-[#BFDBFE] bg-slate-900 flex items-center justify-center h-48 select-none">
                        <img 
                          src={previewUrl} 
                          alt="Screenshot Attachment Preview" 
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* FORM BUTTONS */}
            <div className="flex items-center gap-4 pt-6 border-t border-[#BFDBFE]/60 justify-center mt-4">
              <button 
                type="button"
                onClick={handleCancel}
                className="h-14 w-44 flex items-center justify-center rounded-xl text-black font-extrabold border border-[#BFDBFE] hover:bg-slate-50 transition-all text-base bg-white cursor-pointer"
              >
                Cancel
              </button>
              <button 
                type="button"
                onClick={handleClear}
                className="h-14 w-44 flex items-center justify-center rounded-xl text-black font-extrabold border border-[#bae6fd] hover:bg-[#bae6fd]/30 transition-all text-base bg-[#f0f9ff] cursor-pointer"
              >
                Reset
              </button>
              <button 
                type="submit"
                className="h-14 w-44 flex items-center justify-center rounded-xl bg-gradient-to-r from-[#0284c7] to-[#38bdf8] text-white font-extrabold hover:brightness-105 shadow-md shadow-sky-500/10 hover:shadow-sky-500/20 transition-all text-base cursor-pointer border-transparent"
              >
                Create Bug
              </button>
            </div>

          </div>

        </div>
      </form>

      {/* ADD NEW PROJECT MODAL */}
      {showAddProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
          <div 
            className="absolute inset-0"
            onClick={() => setShowAddProjectModal(false)}
          />
          <div className="relative w-full max-w-[520px] p-8 bg-white border border-[#E2EEFC] rounded-[28px] shadow-[0_16px_48px_rgba(191,219,254,0.25)] flex flex-col gap-6 animate-scale-up z-10 text-[#0F172A]">
            <div className="flex justify-between items-center pb-2 border-b border-[#BFDBFE]/50">
              <div>
                <h3 className="text-xl md:text-2xl font-extrabold text-[#0F172A] font-title">Add New Project</h3>
                <p className="text-sm text-slate-500 mt-1">Define project scope and module layers.</p>
              </div>
              <button 
                type="button"
                onClick={() => setShowAddProjectModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-all border border-transparent hover:border-slate-200"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {/* Project Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-[#475569] pl-0.5">Project Name <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="e.g. IoT Dashboard"
                  className="h-11 px-4 rounded-md bg-white border border-blue-300 text-[#0F172A] text-sm font-semibold placeholder-[#94A3B8] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none transition-colors"
                  required
                />
              </div>

              {/* Module Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-[#475569] pl-0.5">New Module <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  value={newModuleName}
                  onChange={(e) => setNewModuleName(e.target.value)}
                  placeholder="e.g. Sensors"
                  className="h-11 px-4 rounded-md bg-white border border-blue-300 text-[#0F172A] text-sm font-semibold placeholder-[#94A3B8] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none transition-colors"
                  required
                />
              </div>

              {/* Sub Module Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-[#475569] pl-0.5">New Sub Module <span className="text-slate-400 font-medium">(Optional)</span></label>
                <input 
                  type="text" 
                  value={newSubModuleName}
                  onChange={(e) => setNewSubModuleName(e.target.value)}
                  placeholder="e.g. Telemetry"
                  className="h-11 px-4 rounded-md bg-white border border-blue-300 text-[#0F172A] text-sm font-semibold placeholder-[#94A3B8] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none transition-colors"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-[#BFDBFE]/50">
              <button 
                type="button"
                onClick={() => setShowAddProjectModal(false)}
                className="flex-1 h-12 rounded-xl text-slate-500 font-bold border border-[#BFDBFE] hover:bg-slate-50 transition-all text-sm bg-white cursor-pointer"
              >
                Cancel
              </button>
              <button 
                type="button"
                onClick={() => {
                  const p = newProjectName.trim();
                  const m = newModuleName.trim();
                  const s = newSubModuleName.trim();
                  if (!p || !m) {
                    alert("Please fill in all required fields (Project Name and New Module).");
                    return;
                  }
                  onAddProject(p, m, s);
                  // Reset fields & close
                  setNewProjectName('');
                  setNewModuleName('');
                  setNewSubModuleName('');
                  setShowAddProjectModal(false);
                }}
                className="flex-1 h-12 rounded-xl bg-gradient-to-r from-[#38BDF8] to-[#7DD3FC] text-[#0F172A] font-bold hover:brightness-105 shadow-md shadow-sky-400/10 transition-all text-sm cursor-pointer border-transparent"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

