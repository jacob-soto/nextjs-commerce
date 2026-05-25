// Unified Platform Types — integrating patterns from dev-grid, legal system, Supervisor, and kev-data

// ─── Repository Management ───────────────────────────────────────────────────

export interface Repository {
  id: string;
  name: string;
  fullName: string;
  description: string;
  language: string;
  url: string;
  deploymentTarget: DeploymentTarget;
  status: RepositoryStatus;
  lastDeployed: string | null;
  environment: DeploymentEnvironment;
}

export type RepositoryStatus =
  | "active"
  | "inactive"
  | "deploying"
  | "error"
  | "pending";
export type DeploymentTarget =
  | "aws-ecs"
  | "gcp-cloudrun"
  | "gcp-gke"
  | "kubernetes"
  | "vercel"
  | "static"
  | "none";
export type DeploymentEnvironment = "production" | "staging" | "development";

// ─── Deployment Orchestration ─────────────────────────────────────────────────

export interface DeploymentConfig {
  id: string;
  repoId: string;
  target: DeploymentTarget;
  environment: DeploymentEnvironment;
  strategy: "rolling" | "blue-green" | "canary";
  status: DeploymentStatus;
  region: string;
  cluster: string;
  service: string;
  taskDefinition: string;
  containerName: string;
  lastDeployedAt: string | null;
  lastDeployedBy: string | null;
}

export type DeploymentStatus =
  | "idle"
  | "building"
  | "pushing"
  | "deploying"
  | "stabilizing"
  | "healthy"
  | "unhealthy"
  | "rolled-back";

export interface ClusterHealth {
  id: string;
  name: string;
  provider: "aws-ecs" | "gcp-gke" | "gcp-cloudrun" | "kubernetes";
  region: string;
  status: "healthy" | "degraded" | "critical" | "unknown";
  nodesTotal: number;
  nodesReady: number;
  podsRunning: number;
  podsDesired: number;
  cpuUtilization: number;
  memoryUtilization: number;
  lastChecked: string;
}

export interface DeploymentEvent {
  id: string;
  deploymentId: string;
  timestamp: string;
  type: "info" | "warning" | "error" | "success";
  message: string;
}

// ─── Revenue & Treasury (from dev-grid SecureWalletView) ──────────────────────

export interface Wallet {
  balance: number;
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  timestamp: string;
  description: string;
  amount: number;
  balance: number;
  source: RevenueSource;
  category: TransactionCategory;
}

export type RevenueSource =
  | "paypal"
  | "stripe"
  | "grant"
  | "asset-recovery"
  | "platform-fees"
  | "allocation"
  | "spot-funding";

export type TransactionCategory =
  | "income"
  | "expense"
  | "allocation"
  | "refund"
  | "grant"
  | "recovery";

export interface RevenueMetrics {
  totalRevenue: number;
  monthlyRevenue: number;
  pendingPayments: number;
  activeSubscriptions: number;
  revenueBySource: Record<RevenueSource, number>;
  monthlyTrend: MonthlyDataPoint[];
}

export interface MonthlyDataPoint {
  month: string;
  revenue: number;
  expenses: number;
}

export interface PaymentConfig {
  provider: "paypal" | "stripe";
  mode: "sandbox" | "live";
  clientId: string;
  configured: boolean;
}

export interface FundAllocation {
  id: string;
  amount: number;
  reason: string;
  status: "pending" | "approved" | "disbursed" | "rejected";
  requestedAt: string;
  approvedAt: string | null;
  approvedBy: string | null;
}

export interface GrantVerification {
  id: string;
  grantName: string;
  status: "pending" | "verified" | "denied";
  amount: number;
  verifiedAt: string | null;
  source: string;
}

// ─── Asset Management (from legal system AssetClaim + dev-grid Forfeiture) ────

export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  status: AssetStatus;
  value: string;
  description: string;
  deployedAt: string | null;
  lastUpdated: string;
  owner: string;
  accessLevel: AccessLevel;
  metadata: Record<string, string>;
}

export type AssetType =
  | "repository"
  | "domain"
  | "certificate"
  | "api-key"
  | "database"
  | "storage"
  | "compute"
  | "financial"
  | "legal";

export type AssetStatus =
  | "active"
  | "inactive"
  | "pending"
  | "blocked"
  | "released"
  | "under_investigation"
  | "deployed"
  | "archived";

export interface AssetClaim {
  id: string;
  label: string;
  amount: string;
  status: "pending" | "blocked" | "released" | "under_investigation";
  filingId: string | null;
  lastUpdated: string;
}

export interface AssetValuation {
  assetId: string;
  currentValue: number;
  previousValue: number;
  changePercent: number;
  valuedAt: string;
  method: "market" | "book" | "appraised";
}

// ─── Security & Compliance (from kev-data + cyber.dhs.gov) ────────────────────

export interface Vulnerability {
  cveID: string;
  vendorProject: string;
  product: string;
  vulnerabilityName: string;
  dateAdded: string;
  shortDescription: string;
  requiredAction: string;
  dueDate: string;
  knownRansomwareCampaignUse: string;
  cwes: string[];
}

export interface SecurityScan {
  id: string;
  repoId: string;
  repoName: string;
  status: "queued" | "scanning" | "completed" | "failed";
  startedAt: string;
  completedAt: string | null;
  vulnerabilitiesFound: number;
  criticalCount: number;
  highCount: number;
  mediumCount: number;
  lowCount: number;
}

export interface ComplianceStatus {
  directive: string;
  title: string;
  status: "compliant" | "non-compliant" | "in-progress" | "not-applicable";
  lastAssessed: string;
  dueDate: string | null;
  requirements: ComplianceRequirement[];
}

export interface ComplianceRequirement {
  id: string;
  description: string;
  status: "met" | "unmet" | "partial";
  evidence: string | null;
}

// ─── Access Control ───────────────────────────────────────────────────────────

export type AccessLevel = "admin" | "developer" | "viewer" | "auditor";

export interface User {
  id: string;
  name: string;
  email: string;
  role: AccessLevel;
  lastActive: string;
  permissions: string[];
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  details: string;
  category: "deployment" | "financial" | "asset" | "security" | "access";
}

// ─── Automation & Orchestration ───────────────────────────────────────────────

export interface AutomationWorkflow {
  id: string;
  name: string;
  description: string;
  type: WorkflowType;
  status: "active" | "paused" | "error" | "completed";
  schedule: string | null;
  lastRun: string | null;
  nextRun: string | null;
  steps: WorkflowStep[];
  triggerType: "manual" | "schedule" | "webhook" | "event";
}

export type WorkflowType =
  | "deployment"
  | "revenue-reconciliation"
  | "asset-publishing"
  | "security-scan"
  | "batch-operation"
  | "notification";

export interface WorkflowStep {
  id: string;
  name: string;
  type: string;
  status: "pending" | "running" | "completed" | "failed" | "skipped";
  startedAt: string | null;
  completedAt: string | null;
  output: string | null;
}

export interface Notification {
  id: string;
  timestamp: string;
  type: "deployment" | "revenue" | "asset" | "security" | "system";
  severity: "info" | "warning" | "error" | "success";
  title: string;
  message: string;
  read: boolean;
  actionUrl: string | null;
}

// ─── Dashboard Aggregates ─────────────────────────────────────────────────────

export interface PlatformOverview {
  repositories: {
    total: number;
    active: number;
    deploying: number;
    error: number;
  };
  deployments: { healthy: number; degraded: number; pending: number };
  revenue: { total: number; monthly: number; pending: number };
  assets: { total: number; active: number; pendingClaims: number };
  security: {
    vulnerabilities: number;
    critical: number;
    compliant: number;
    scansRunning: number;
  };
  automation: {
    activeWorkflows: number;
    completedToday: number;
    failedToday: number;
  };
}
