

import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch events from the backend
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/events'); // Backend endpoint
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image
        source={require('../assets/landing-bg.jpg')}
        style={styles.backgroundImage}
      />
      {/* Navbar */}
      <View style={styles.navbar}>
        <Text style={styles.logo}>Freshman Guide</Text>
        <TouchableOpacity onPress={toggleMenu}>
          <Ionicons
            name={menuOpen ? 'close' : 'menu'}
            size={28}
            color="#ffffff"
          />
        </TouchableOpacity>
      </View>

      {/* Dropdown Menu */}
      {menuOpen && (
        <View style={styles.dropdownMenu}>
          <TouchableOpacity onPress={() => navigation.navigate('Help')}>
            <Text style={styles.menuItem}>Help</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.menuItem}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.menuItem}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Freshman Guide</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>

      {/* Calendar of Events */}
      <View style={styles.calendar}>
        <Text style={styles.calendarTitle}>Calendar of Events</Text>
        <FlatList
          data={events}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.eventCard}>
              <Text style={styles.eventName}>{item.eventName}</Text>
              <Text style={styles.eventDetails}>{new Date(item.date).toLocaleDateString()}</Text>
              <Text style={styles.eventDetails}>{item.location}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  logo: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  dropdownMenu: {
    backgroundColor: '#ffffff',
    position: 'absolute',
    top: 64,
    right: 16,
    padding: 10,
    borderRadius: 5,
    elevation: 5,
  },
  menuItem: {
    fontSize: 18,
    paddingVertical: 8,
    paddingHorizontal: 16,
    color: '#3498db',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  calendar: {
    padding: 16,
    backgroundColor: '#ffffff',
  },
  calendarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  eventCard: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555555',
  },
  eventDetails: {
    fontSize: 14,
    color: '#777777',
  },
});

export default LandingPage;
