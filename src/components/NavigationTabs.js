import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const PRIMARY_COLOR = '#4C6EF5';

export const NavigationTabs = ({ tabs, activeTab, onChange }) => {
  return (
    <View style={styles.navBar}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <Pressable
            key={tab.id}
            onPress={() => onChange(tab.id)}
            style={({ pressed }) => [
              styles.navButton,
              isActive && styles.navButtonActive,
              pressed && styles.navButtonPressed
            ]}
          >
            <Text style={[styles.navButtonText, isActive && styles.navButtonTextActive]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12
  },
  navButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    borderWidth: 1,
    borderColor: 'rgba(76, 110, 245, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0F172A',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2
  },
  navButtonActive: {
    backgroundColor: PRIMARY_COLOR,
    borderColor: 'transparent',
    shadowOpacity: 0.18,
    elevation: 3
  },
  navButtonPressed: {
    transform: [{ scale: 0.98 }]
  },
  navButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#475569'
  },
  navButtonTextActive: {
    color: '#fff'
  }
});
