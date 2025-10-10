import { BadRequestException, ConflictException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { WorkspaceGroupServiceService } from './workspace-group-service.service';
import { Repository } from 'typeorm';
import { Workspace } from './entities/workspace.entity';
import { WorkspaceMember } from './entities/workspace_user.entity';
import { Group } from './entities/group.entity';
import { GroupMember } from './entities/group-member.entity';
import { ChatMessage } from './entities/chat-message.entity';
import { Resource } from './entities/resource.entity';

describe('WorkspaceGroupServiceService - sendChatMessage', () => {
  const createMockRepository = <T extends object>() => ({
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    findAndCount: jest.fn(),
    count: jest.fn(),
    remove: jest.fn(),
    delete: jest.fn(),
  }) as unknown as jest.Mocked<Repository<T>>;

  let workspaceRepository: jest.Mocked<Repository<Workspace>>;
  let workspaceMemberRepository: jest.Mocked<Repository<WorkspaceMember>>;
  let groupRepository: jest.Mocked<Repository<Group>>;
  let groupMemberRepository: jest.Mocked<Repository<GroupMember>>;
  let chatMessageRepository: jest.Mocked<Repository<ChatMessage>>;
  let resourceRepository: jest.Mocked<Repository<Resource>>;
  let authClient: jest.Mocked<ClientProxy>;
  let configService: jest.Mocked<ConfigService>;
  let service: WorkspaceGroupServiceService;

  beforeEach(() => {
    workspaceRepository = createMockRepository<Workspace>();
    workspaceMemberRepository = createMockRepository<WorkspaceMember>();
    groupRepository = createMockRepository<Group>();
    groupMemberRepository = createMockRepository<GroupMember>();
    chatMessageRepository = createMockRepository<ChatMessage>();
    resourceRepository = createMockRepository<Resource>();

    authClient = {
      send: jest.fn(),
    } as unknown as jest.Mocked<ClientProxy>;

    configService = {
      get: jest.fn().mockReturnValue(undefined),
    } as unknown as jest.Mocked<ConfigService>;

    service = new WorkspaceGroupServiceService(
      workspaceRepository,
      workspaceMemberRepository,
      groupRepository,
      groupMemberRepository,
      chatMessageRepository,
      resourceRepository,
      authClient,
      configService,
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('throws BadRequestException when neither text nor attachment is provided', async () => {
    await expect(
      service.sendChatMessage('user-1', { groupId: 'group-1' } as any),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('persists a text-only message successfully', async () => {
    const inputText = 'Hello world';
    const now = new Date();

    groupRepository.findOne.mockResolvedValue({ groupid: 'group-1' } as Group);
    groupMemberRepository.findOne.mockResolvedValue({
      groupid: 'group-1',
      userid: 'user-1',
    } as GroupMember);

    chatMessageRepository.create.mockImplementation(
      (entity: Partial<ChatMessage>) => ({ ...entity }) as ChatMessage,
    );
    chatMessageRepository.save.mockImplementation(
      async (entity: ChatMessage) => ({
        ...entity,
        chatid: 'chat-1',
        messagetype: 'text',
        sentat: now,
      }) as ChatMessage,
    );

    jest
      .spyOn(service, 'getUserDetails')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .mockResolvedValue({ fullName: 'Test User' } as any);

    const result = await service.sendChatMessage('user-1', {
      groupId: 'group-1',
      text: inputText,
    });

    expect(chatMessageRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        groupid: 'group-1',
        userid: 'user-1',
        text: inputText,
        resourceid: undefined,
        messagetype: 'text',
      }),
    );

    expect(result).toEqual(
      expect.objectContaining({
        chatId: 'chat-1',
        groupId: 'group-1',
        userId: 'user-1',
        userName: 'Test User',
        text: inputText,
        messageType: 'text',
        resource: undefined,
        sentAt: now,
      }),
    );
  });

  it('propagates storage configuration errors when uploading attachments', async () => {
    groupRepository.findOne.mockResolvedValue({ groupid: 'group-1' } as Group);
    groupMemberRepository.findOne.mockResolvedValue({
      groupid: 'group-1',
      userid: 'user-1',
    } as GroupMember);

    await expect(
      service.sendChatMessage('user-1', {
        groupId: 'group-1',
        attachment: {
          fileName: 'file.pdf',
          mimeType: 'application/pdf',
          base64Data: Buffer.from('test').toString('base64'),
        },
      }),
    ).rejects.toBeInstanceOf(ConflictException);
  });
});
