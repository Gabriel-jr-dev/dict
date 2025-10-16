import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export const NavigationTabs = ({ tabs, activeTab, onChange }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.navBar}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <Pressable
              key={tab.id}
              style={[styles.navButton, isActive && styles.navButtonActive]}
              onPress={() => onChange(tab.id)}
            >
              <Text style={[styles.navButtonText, isActive && styles.navButtonTextActive]}>
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 24,
    marginBottom: 12
  },
  navBar: {
    flexDirection: 'row',
    backgroundColor: '#e2e8f0',
    borderRadius: 999,
    padding: 6,
    gap: 6,
    shadowColor: '#0f172a',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3
  },
  navButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 999,
    alignItems: 'center'
  },
  navButtonActive: {
    backgroundColor: '#4338ca'
  },
  navButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#475569'
  },
  navButtonTextActive: {
    color: '#f8fafc'
  }
});
