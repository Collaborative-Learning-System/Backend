import { NestFactory } from '@nestjs/core';
import { WorkspaceGroupServiceModule } from '../apps/workspace-group-service/src/workspace-group-service.module';
import { WorkspaceGroupServiceService } from '../apps/workspace-group-service/src/workspace-group-service.service';

async function seedTestData() {
  const app = await NestFactory.createApplicationContext(WorkspaceGroupServiceModule);
  const workspaceService = app.get(WorkspaceGroupServiceService);

  try {
    console.log('Creating test workspace...');
    
    // Create a test workspace
    const workspace = await workspaceService.createWorkspace('test-user-1', {
      workspacename: 'Test Chat Workspace',
      description: 'Workspace for testing chat functionality'
    });
    
    console.log('Workspace created:', workspace);

    // Create a test group
    const group = await workspaceService.createGroup('test-user-1', workspace.id, {
      groupname: 'Test Chat Group',
      description: 'Group for testing chat functionality'
    });
    
    console.log('Group created:', group);

    // Add a second user to test multi-user chat
    await workspaceService.joinWorkspace('test-user-2', {
      workspaceId: workspace.id
    });
    
    console.log('Second user joined workspace');

    // Add both users to the group
    await workspaceService.joinLeaveGroup('test-user-2', {
      groupId: group.id
    });
    
    console.log('Second user joined group');

    console.log('\n=== Test Data Created Successfully ===');
    console.log(`Workspace ID: ${workspace.id}`);
    console.log(`Group ID: ${group.id}`);
    console.log('Test Users: test-user-1, test-user-2');
    console.log('\nYou can now use these IDs to test the chat functionality!');
    
  } catch (error) {
    console.error('Error creating test data:', error);
  } finally {
    await app.close();
  }
}

seedTestData();
