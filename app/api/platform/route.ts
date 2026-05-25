import { NextResponse } from "next/server";
import {
  PLATFORM_OVERVIEW,
  REPOSITORIES,
  CLUSTERS,
  DEPLOYMENTS,
  DEPLOYMENT_EVENTS,
  TREASURY,
  REVENUE_METRICS,
  ASSETS,
  ASSET_CLAIMS,
  SECURITY_SCANS,
  KEV_SAMPLE,
  COMPLIANCE_STATUSES,
  WORKFLOWS,
  NOTIFICATIONS,
  AUDIT_LOG,
} from "lib/platform/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const section = searchParams.get("section");

  switch (section) {
    case "overview":
      return NextResponse.json(PLATFORM_OVERVIEW);
    case "repositories":
      return NextResponse.json(REPOSITORIES);
    case "clusters":
      return NextResponse.json(CLUSTERS);
    case "deployments":
      return NextResponse.json(DEPLOYMENTS);
    case "deployment-events":
      return NextResponse.json(DEPLOYMENT_EVENTS);
    case "treasury":
      return NextResponse.json(TREASURY);
    case "revenue":
      return NextResponse.json(REVENUE_METRICS);
    case "assets":
      return NextResponse.json(ASSETS);
    case "asset-claims":
      return NextResponse.json(ASSET_CLAIMS);
    case "security-scans":
      return NextResponse.json(SECURITY_SCANS);
    case "kev":
      return NextResponse.json(KEV_SAMPLE);
    case "compliance":
      return NextResponse.json(COMPLIANCE_STATUSES);
    case "workflows":
      return NextResponse.json(WORKFLOWS);
    case "notifications":
      return NextResponse.json(NOTIFICATIONS);
    case "audit-log":
      return NextResponse.json(AUDIT_LOG);
    default:
      return NextResponse.json({
        platform: "NEXUS Unified Hosting Platform",
        version: "1.0.0",
        sections: [
          "overview",
          "repositories",
          "clusters",
          "deployments",
          "deployment-events",
          "treasury",
          "revenue",
          "assets",
          "asset-claims",
          "security-scans",
          "kev",
          "compliance",
          "workflows",
          "notifications",
          "audit-log",
        ],
        integrations: {
          "jacob-soto/Supervisor": "AWS ECS/ECR deployment infrastructure",
          "jacob-soto/kubectl-ai": "Kubernetes orchestration and automation",
          "jacob-soto/nationalsecurityagency.github.io":
            "Terraform IaC foundation",
          "jacob-soto/nextjs-commerce": "E-commerce platform base",
          "jacob-soto/merchant-sdk-php": "Payment processing integration",
          "jacob-soto/dev-grid": "Financial management system",
          "jacob-soto/Jacob-Soto-The-commission-on-human-rights-pro-hac-vice":
            "Asset tracking system",
          "jacob-soto/kev-data": "CISA KEV vulnerability catalog",
          "jacob-soto/cyber.dhs.gov": "DHS cybersecurity compliance",
        },
      });
  }
}
