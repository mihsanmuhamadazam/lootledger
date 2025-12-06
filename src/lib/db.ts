import { openDB, DBSchema, IDBPDatabase } from 'idb';
import type { User, ValorantSkin, CSGOSkin, GamingSubscription, GameWorthEntry, Friend } from '../types';

interface LootLedgerDB extends DBSchema {
  users: {
    key: string;
    value: User;
    indexes: { 'by-email': string; 'by-shareCode': string };
  };
  valorantSkins: {
    key: string;
    value: ValorantSkin;
    indexes: { 'by-odId': string };
  };
  csgoSkins: {
    key: string;
    value: CSGOSkin;
    indexes: { 'by-odId': string };
  };
  subscriptions: {
    key: string;
    value: GamingSubscription;
    indexes: { 'by-odId': string };
  };
  gameWorth: {
    key: string;
    value: GameWorthEntry;
    indexes: { 'by-odId': string };
  };
  friends: {
    key: string;
    value: Friend;
    indexes: { 'by-odId': string };
  };
}

const DB_NAME = 'lootledger-db';
const DB_VERSION = 2;

let dbInstance: IDBPDatabase<LootLedgerDB> | null = null;

export async function getDB(): Promise<IDBPDatabase<LootLedgerDB>> {
  if (dbInstance) return dbInstance;

  dbInstance = await openDB<LootLedgerDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Users store
      if (!db.objectStoreNames.contains('users')) {
        const userStore = db.createObjectStore('users', { keyPath: 'id' });
        userStore.createIndex('by-email', 'email', { unique: true });
        userStore.createIndex('by-shareCode', 'shareCode', { unique: true });
      }

      // Valorant Skins store
      if (!db.objectStoreNames.contains('valorantSkins')) {
        const valStore = db.createObjectStore('valorantSkins', { keyPath: 'id' });
        valStore.createIndex('by-odId', 'odId');
      }

      // CS:GO Skins store
      if (!db.objectStoreNames.contains('csgoSkins')) {
        const csgoStore = db.createObjectStore('csgoSkins', { keyPath: 'id' });
        csgoStore.createIndex('by-odId', 'odId');
      }

      // Subscriptions store
      if (!db.objectStoreNames.contains('subscriptions')) {
        const subStore = db.createObjectStore('subscriptions', { keyPath: 'id' });
        subStore.createIndex('by-odId', 'odId');
      }

      // Game Worth Calculator store
      if (!db.objectStoreNames.contains('gameWorth')) {
        const gameStore = db.createObjectStore('gameWorth', { keyPath: 'id' });
        gameStore.createIndex('by-odId', 'odId');
      }

      // Friends store
      if (!db.objectStoreNames.contains('friends')) {
        const friendStore = db.createObjectStore('friends', { keyPath: 'id' });
        friendStore.createIndex('by-odId', 'odId');
      }

    },
  });

  return dbInstance;
}

// Generate unique share code
export function generateShareCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Generate unique ID
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// User operations
export async function createUser(user: User): Promise<User> {
  const db = await getDB();
  await db.add('users', user);
  return user;
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  const db = await getDB();
  return db.getFromIndex('users', 'by-email', email);
}

export async function getUserById(id: string): Promise<User | undefined> {
  const db = await getDB();
  return db.get('users', id);
}

export async function getUserByShareCode(shareCode: string): Promise<User | undefined> {
  const db = await getDB();
  return db.getFromIndex('users', 'by-shareCode', shareCode);
}

export async function updateUser(user: User): Promise<User> {
  const db = await getDB();
  await db.put('users', user);
  return user;
}

// Valorant Skin operations
export async function createValorantSkin(skin: ValorantSkin): Promise<ValorantSkin> {
  const db = await getDB();
  await db.add('valorantSkins', skin);
  return skin;
}

export async function getValorantSkinsByUserId(userId: string): Promise<ValorantSkin[]> {
  const db = await getDB();
  return db.getAllFromIndex('valorantSkins', 'by-odId', userId);
}

export async function updateValorantSkin(skin: ValorantSkin): Promise<ValorantSkin> {
  const db = await getDB();
  await db.put('valorantSkins', skin);
  return skin;
}

export async function deleteValorantSkin(id: string): Promise<void> {
  const db = await getDB();
  await db.delete('valorantSkins', id);
}

// CS:GO Skin operations
export async function createCSGOSkin(skin: CSGOSkin): Promise<CSGOSkin> {
  const db = await getDB();
  await db.add('csgoSkins', skin);
  return skin;
}

export async function getCSGOSkinsByUserId(userId: string): Promise<CSGOSkin[]> {
  const db = await getDB();
  return db.getAllFromIndex('csgoSkins', 'by-odId', userId);
}

export async function updateCSGOSkin(skin: CSGOSkin): Promise<CSGOSkin> {
  const db = await getDB();
  await db.put('csgoSkins', skin);
  return skin;
}

export async function deleteCSGOSkin(id: string): Promise<void> {
  const db = await getDB();
  await db.delete('csgoSkins', id);
}

// Subscription operations
export async function createSubscription(sub: GamingSubscription): Promise<GamingSubscription> {
  const db = await getDB();
  await db.add('subscriptions', sub);
  return sub;
}

export async function getSubscriptionsByUserId(userId: string): Promise<GamingSubscription[]> {
  const db = await getDB();
  return db.getAllFromIndex('subscriptions', 'by-odId', userId);
}

export async function updateSubscription(sub: GamingSubscription): Promise<GamingSubscription> {
  const db = await getDB();
  await db.put('subscriptions', sub);
  return sub;
}

export async function deleteSubscription(id: string): Promise<void> {
  const db = await getDB();
  await db.delete('subscriptions', id);
}

// Game Worth operations
export async function createGameWorthEntry(entry: GameWorthEntry): Promise<GameWorthEntry> {
  const db = await getDB();
  await db.add('gameWorth', entry);
  return entry;
}

export async function getGameWorthEntriesByUserId(userId: string): Promise<GameWorthEntry[]> {
  const db = await getDB();
  return db.getAllFromIndex('gameWorth', 'by-odId', userId);
}

export async function updateGameWorthEntry(entry: GameWorthEntry): Promise<GameWorthEntry> {
  const db = await getDB();
  await db.put('gameWorth', entry);
  return entry;
}

export async function deleteGameWorthEntry(id: string): Promise<void> {
  const db = await getDB();
  await db.delete('gameWorth', id);
}

// Friend operations
export async function addFriend(friend: Friend): Promise<Friend> {
  const db = await getDB();
  await db.add('friends', friend);
  return friend;
}

export async function getFriendsByUserId(userId: string): Promise<Friend[]> {
  const db = await getDB();
  return db.getAllFromIndex('friends', 'by-odId', userId);
}

export async function deleteFriend(id: string): Promise<void> {
  const db = await getDB();
  await db.delete('friends', id);
}
