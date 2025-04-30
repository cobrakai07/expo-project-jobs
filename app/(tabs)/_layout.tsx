import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { View, Text, StyleSheet, Platform } from 'react-native';

// Reusable Icon Component
function TabBarIconComponent(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={24} {...props} />;
}

const TabLayout = () => {
  // Define colors
  const tabBarBackgroundColor = '#000';
  const activeIconBackgroundColor = 'cyan'; // Inner active circle color
  const outerCircleColor = '#1a1a1a';      // Dark color for the outer enclosing circle (slightly off-black)
  const iconInCircleColor = '#000';
  const activeLabelColor = 'white';
  const inactiveColor = 'gray';

  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: inactiveColor,
        headerShown: false,
        // tabBarShowLabel: false, // Keep commented out if you want labels visible
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 10,
          right: 10,
          borderTopEndRadius: 15,
          borderTopLeftRadius: 15,
          backgroundColor: tabBarBackgroundColor,
          height: 60, // Ensure height accommodates shifted icons
          paddingBottom: 5,
          borderTopWidth: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 5,
        },
      }}
    >
      {/* --- Home Screen (Single Circle) --- */}
      {/* <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              {focused ? (
                // Use the original active wrapper for a single circle
                <View style={[styles.activeIconWrapper, { backgroundColor: activeIconBackgroundColor }]}>
                  <TabBarIconComponent name="home" color={iconInCircleColor} />
                </View>
              ) : (
                <TabBarIconComponent name="home" color={inactiveColor} />
              )}
            </View>
          ),
          tabBarLabel: ({ focused, children }) => (
            <Text style={[styles.labelText, { color: focused ? activeLabelColor : inactiveColor }]}>
              {children}
            </Text>
          ),
        }}
      /> */}

      
<Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              {focused ? (
                // Outer dark circle - applies the transform
                <View style={[styles.outerActiveIconWrapper, { backgroundColor: outerCircleColor }]}>
                  {/* Inner cyan circle - centered inside outer, no transform */}
                  <View style={[styles.innerActiveIconWrapper, { backgroundColor: activeIconBackgroundColor }]}>
                    <TabBarIconComponent name="home" color={iconInCircleColor} />
                    {/* <TabBarIconComponent name="cogs" color={iconInCircleColor} /> */}
                  </View>
                </View>
              ) : (
                <TabBarIconComponent name="home" color={inactiveColor} />
              )}
            </View>
          ),
          tabBarLabel: ({ focused, children }) => (
            <Text style={[styles.labelText, { color: focused ? activeLabelColor : inactiveColor }]}>
              {children}
            </Text>
          ),
        }}
      />

            

   
      <Tabs.Screen
        name="bookmarks"
        options={{
          title: 'Setting',
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              {focused ? (
                // Outer dark circle - applies the transform
                <View style={[styles.outerActiveIconWrapper, { backgroundColor: outerCircleColor }]}>
                  {/* Inner cyan circle - centered inside outer, no transform */}
                  <View style={[styles.innerActiveIconWrapper, { backgroundColor: activeIconBackgroundColor }]}>
                    <TabBarIconComponent name="cogs" color={iconInCircleColor} />
                  </View>
                </View>
              ) : (
                <TabBarIconComponent name="cogs" color={inactiveColor} />
              )}
            </View>
          ),
          tabBarLabel: ({ focused, children }) => (
            <Text style={[styles.labelText, { color: focused ? activeLabelColor : inactiveColor }]}>
              {children}
            </Text>
          ),
        }}
      />


      {/* Add other screens */}
    </Tabs>
  );
}

// --- StyleSheet ---
const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    // Ensure container is large enough for the biggest circle + transform
    width: 70,
    height: 70, // Increased height slightly due to nesting
  },
  // Style for the standard single active icon (like Home)
  activeIconWrapper: {
    width: 55, // Original size
    height: 55,
    borderRadius: 30, // Original radius
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateY: -20 }], // Upward shift
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  // Style for the OUTER enclosing circle (Dashboard)
  outerActiveIconWrapper: {
    width: 60, // Slightly larger than the standard wrapper
    height: 60,
    borderRadius: 31, // Half of the new size
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateY: -10 }], // Apply the SAME upward shift
     // Shadow for the outer circle
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 10, // Higher elevation for the outer element
  },
  // Style for the INNER circle when it's NESTED (Dashboard)
  innerActiveIconWrapper: {
    width: 50, // Make it slightly smaller than outer to create the border effect
    height: 50,
    borderRadius: 25, // Half of its own size
    justifyContent: 'center',
    alignItems: 'center',
    // No transform here - it's positioned by the outer wrapper
    // No shadow here - the outer wrapper provides the shadow
  },
  labelText: {
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
    // Adjust marginTop to position label correctly relative to shifted icons
    marginTop: 5, // May need slight adjustment based on final icon sizes/shift
  },
});

export default TabLayout;