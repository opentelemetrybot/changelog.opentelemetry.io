#!/usr/bin/env python3
"""
GitHub Workflow Permissions Verification Script for OpenSSF Scorecard Compliance

This script verifies that all GitHub workflow files in this repository have proper
root-level permissions defined according to OpenSSF Scorecard Token-Permissions requirements.

Usage:
    python scripts/verify-workflow-permissions.py
"""

import os
import yaml
import sys
from pathlib import Path

def main():
    """Verify workflow permissions compliance."""
    
    # Get repository root (script should be run from repo root)
    repo_root = os.getcwd()
    workflow_dir = os.path.join(repo_root, ".github", "workflows")
    
    if not os.path.exists(workflow_dir):
        print("❌ No .github/workflows directory found")
        sys.exit(1)
    
    # Find all workflow files
    workflow_files = []
    for filename in os.listdir(workflow_dir):
        if filename.endswith(('.yml', '.yaml')):
            workflow_files.append(filename)
    
    if not workflow_files:
        print("❌ No workflow files found")
        sys.exit(1)
    
    print(f"Verifying {len(workflow_files)} workflow files...")
    
    all_compliant = True
    
    for filename in sorted(workflow_files):
        filepath = os.path.join(workflow_dir, filename)
        
        try:
            with open(filepath, 'r') as f:
                data = yaml.safe_load(f)
            
            if not isinstance(data, dict):
                print(f"❌ {filename}: Invalid YAML structure")
                all_compliant = False
                continue
            
            # Check root-level permissions
            if 'permissions' not in data:
                print(f"❌ {filename}: Missing root-level permissions block")
                all_compliant = False
                continue
                
            root_permissions = data['permissions']
            
            # Validate root-level permissions
            valid_permission = False
            if isinstance(root_permissions, str) and root_permissions == 'read-all':
                valid_permission = True
            elif isinstance(root_permissions, dict):
                if len(root_permissions) == 1 and root_permissions.get('contents') == 'read':
                    valid_permission = True
            
            if valid_permission:
                print(f"✅ {filename}: Compliant")
            else:
                print(f"❌ {filename}: Invalid root-level permissions: {root_permissions}")
                all_compliant = False
                
        except yaml.YAMLError as e:
            print(f"❌ {filename}: YAML parsing error: {e}")
            all_compliant = False
        except Exception as e:
            print(f"❌ {filename}: Error reading file: {e}")
            all_compliant = False
    
    if all_compliant:
        print("\n🎉 All workflow files are compliant with OpenSSF Scorecard Token-Permissions requirements!")
        sys.exit(0)
    else:
        print("\n❌ Some workflow files need attention")
        sys.exit(1)

if __name__ == "__main__":
    main()