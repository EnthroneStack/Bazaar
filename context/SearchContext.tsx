"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

interface SearchHistoryItem {
  query: string;
  timestamp: number;
  id?: string;
  synced?: boolean;
}

interface SearchContextType {
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  recentSearches: string[];
  addToRecentSearches: (query: string) => void;
  clearRecentSearches: () => void;
  syncSearchHistory: () => Promise<void>;
  isSyncing: boolean;
  isCloudEnabled: boolean;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

// Constants
const STORAGE_KEYS = {
  RECENT_SEARCHES: "bazaar-recent-searches",
  USER_SESSION: "bazaar-user-session",
  SEARCH_METADATA: "bazaar-search-metadata",
  CLOUD_ENABLED: "bazaar-cloud-enabled",
} as const;

const CONFIG = {
  MAX_LOCAL_SEARCHES: 15,
  MAX_SYNCED_SEARCHES: 50,
  SYNC_THRESHOLD: 5,
  CACHE_TTL: 30 * 24 * 60 * 60 * 1000,
} as const;

class SearchStorageService {
  private isUserLoggedIn = false;
  private userId: string | null = null;
  private isCloudEnabled = false;

  constructor() {
    this.initializeUserState();
    this.initializeCloudStatus();
  }

  private initializeUserState() {
    try {
      const session = localStorage.getItem(STORAGE_KEYS.USER_SESSION);
      if (session) {
        const sessionData = JSON.parse(session);
        this.isUserLoggedIn = sessionData.isAuthenticated || false;
        this.userId = sessionData.userId || null;
      }
    } catch (error) {
      console.warn("Failed to initialize user state:", error);
    }
  }

  private initializeCloudStatus() {
    try {
      const cloudEnabled = localStorage.getItem(STORAGE_KEYS.CLOUD_ENABLED);
      this.isCloudEnabled = cloudEnabled ? JSON.parse(cloudEnabled) : false;
    } catch (error) {
      console.warn("Failed to initialize cloud status:", error);
      this.isCloudEnabled = false;
    }
  }

  // Local storage operations
  async getLocalSearches(): Promise<SearchHistoryItem[]> {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.RECENT_SEARCHES);
      if (!stored) return [];

      const searches: SearchHistoryItem[] = JSON.parse(stored);
      const now = Date.now();

      const validSearches = searches.filter(
        (item) => now - item.timestamp < CONFIG.CACHE_TTL
      );

      if (validSearches.length !== searches.length) {
        await this.saveLocalSearches(validSearches);
      }

      return validSearches;
    } catch (error) {
      console.error("Error reading local searches:", error);
      return [];
    }
  }

  async saveLocalSearches(searches: SearchHistoryItem[]): Promise<void> {
    try {
      const sorted = searches
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, CONFIG.MAX_LOCAL_SEARCHES);

      localStorage.setItem(
        STORAGE_KEYS.RECENT_SEARCHES,
        JSON.stringify(sorted)
      );
    } catch (error) {
      console.error("Error saving local searches:", error);
    }
  }

  async addLocalSearch(query: string): Promise<void> {
    const searches = await this.getLocalSearches();
    const trimmedQuery = query.trim();

    if (!trimmedQuery) return;

    const filtered = searches.filter(
      (item) => item.query.toLowerCase() !== trimmedQuery.toLowerCase()
    );

    const newSearch: SearchHistoryItem = {
      query: trimmedQuery,
      timestamp: Date.now(),
      synced: this.isUserLoggedIn && this.isCloudEnabled,
    };

    const updatedSearches = [newSearch, ...filtered];
    await this.saveLocalSearches(updatedSearches);

    if (this.isUserLoggedIn && this.isCloudEnabled) {
      this.triggerSync();
    }
  }

  async clearLocalSearches(): Promise<void> {
    try {
      localStorage.removeItem(STORAGE_KEYS.RECENT_SEARCHES);

      if (this.isUserLoggedIn && this.isCloudEnabled) {
        await this.clearCloudSearches();
      }
    } catch (error) {
      console.error("Error clearing searches:", error);
    }
  }

  // Cloud storage operations
  private async triggerSync(): Promise<void> {
    console.log("Triggering search history sync...");
    // Simulate API call
    return new Promise((resolve) => setTimeout(resolve, 1000));
  }

  private async clearCloudSearches(): Promise<void> {
    console.log("Clearing cloud search history...");
    return new Promise((resolve) => setTimeout(resolve, 500));
  }

  // User management methods
  setUserLoggedIn(userId: string) {
    this.isUserLoggedIn = true;
    this.userId = userId;
    if (this.isCloudEnabled) {
      this.triggerSync();
    }
  }

  setUserLoggedOut() {
    this.isUserLoggedIn = false;
    this.userId = null;
  }

  // Cloud status management
  enableCloudSync() {
    this.isCloudEnabled = true;
    localStorage.setItem(STORAGE_KEYS.CLOUD_ENABLED, "true");
    if (this.isUserLoggedIn) {
      this.triggerSync();
    }
  }

  disableCloudSync() {
    this.isCloudEnabled = false;
    localStorage.setItem(STORAGE_KEYS.CLOUD_ENABLED, "false");
  }

  getCloudStatus(): boolean {
    return this.isCloudEnabled;
  }

  async getRecentSearchQueries(): Promise<string[]> {
    const searches = await this.getLocalSearches();
    return searches.map((item) => item.query);
  }
}

// Storage service instance
const searchStorage = new SearchStorageService();

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCloudEnabled, setIsCloudEnabled] = useState(false);

  useEffect(() => {
    const loadInitialData = async () => {
      const searches = await searchStorage.getRecentSearchQueries();
      setRecentSearches(searches);
      setIsCloudEnabled(searchStorage.getCloudStatus());
      setIsLoaded(true);
    };

    loadInitialData();
  }, []);

  const openSearch = useCallback(() => {
    setIsSearchOpen(true);
  }, []);

  const closeSearch = useCallback(() => {
    setIsSearchOpen(false);
    setSearchQuery("");
  }, []);

  const addToRecentSearches = useCallback(async (query: string) => {
    await searchStorage.addLocalSearch(query);
    const updatedSearches = await searchStorage.getRecentSearchQueries();
    setRecentSearches(updatedSearches);
  }, []);

  const clearRecentSearches = useCallback(async () => {
    await searchStorage.clearLocalSearches();
    setRecentSearches([]);
  }, []);

  const syncSearchHistory = useCallback(async () => {
    if (isSyncing) return;

    setIsSyncing(true);
    try {
      setIsCloudEnabled(searchStorage.getCloudStatus());
    } catch (error) {
      console.error("Failed to sync search history:", error);
    } finally {
      setIsSyncing(false);
    }
  }, [isSyncing]);

  const toggleCloudSync = useCallback(() => {
    if (isCloudEnabled) {
      searchStorage.disableCloudSync();
      setIsCloudEnabled(false);
    } else {
      searchStorage.enableCloudSync();
      setIsCloudEnabled(true);
    }
  }, [isCloudEnabled]);

  useEffect(() => {
    const handleAuthChange = (event: CustomEvent) => {
      const { userId, isAuthenticated } = event.detail;

      if (isAuthenticated && userId) {
        searchStorage.setUserLoggedIn(userId);
      } else {
        searchStorage.setUserLoggedOut();
      }
    };

    window.addEventListener(
      "authStateChange",
      handleAuthChange as EventListener
    );

    return () => {
      window.removeEventListener(
        "authStateChange",
        handleAuthChange as EventListener
      );
    };
  }, []);

  return (
    <SearchContext.Provider
      value={{
        isSearchOpen,
        openSearch,
        closeSearch,
        searchQuery,
        setSearchQuery,
        recentSearches,
        addToRecentSearches,
        clearRecentSearches,
        syncSearchHistory,
        isSyncing,
        isCloudEnabled,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
