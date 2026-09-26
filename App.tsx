// GIỜ 5 — Tổng hợp: Bottom Tab Layout & Hoàn thiện ứng dụng
import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { TabBar, TabKey } from './components/TabBar';
import { CartScreen } from './screens/CartScreen';
import { HomeScreen } from './screens/HomeScreen';
import { CategoryChips } from './components/CategoryChips'; // 1. Import CategoryChips
import { CART_ITEMS, BOOKS } from './data';
import { BookDetailScreen } from './screens/BookDetailScreen';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const selectedBook = BOOKS.find((b) => b.id === selectedBookId) ?? null;

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.body}>
        {activeTab === 'home' ? (
          <View style={styles.body}>
            {selectedBook ? (
              <BookDetailScreen
                book={selectedBook}
                onBack={() => setSelectedBookId(null)}
                onAddToCart={() => setCartCount((n) => n + 1)}
              />
            ) : (
              <HomeScreen
                cartCount={cartCount}
                onPressBook={(id) => setSelectedBookId(id)}
                onPressCart={() => setActiveTab('cart')}
              />
            )}
          </View>
        ) : activeTab === 'category' ? (
          // 2. Render giao diện Danh mục khi activeTab === 'category'
          <View style={styles.categoryContainer}>
            <Text style={styles.sectionTitle}>Danh mục</Text>
            <CategoryChips />
          </View>
        ) : activeTab === 'cart' ? (
          <CartScreen items={CART_ITEMS} />
        ) : (
          <Placeholder tab={activeTab} />
        )}
        <TabBar active={activeTab} onChange={setActiveTab} />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

function Placeholder({ tab }: { tab: TabKey }) {
  const note: Record<TabKey, string> = {
    home: '',
    category: '',
    cart: '',
    account: 'Tài liệu gốc không mô tả tab này, để trống.',
  };
  return (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderText}>{note[tab]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FFFFFF' },
  body: { flex: 1 },
  categoryContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#0F172A',
  },
  placeholder: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  placeholderText: { textAlign: 'center', color: '#5B6B7F' },
});