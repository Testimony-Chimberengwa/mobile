// import React, { useState, useEffect } from 'react';
// import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
// import StarRating from '../components/StarRating';

// const MentorshipAdvice = () => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/mentorships');
//         const data = await response.json();
//         setPosts(data);
//       } catch (error) {
//         console.error('Error fetching mentorship posts:', error);
//       }
//     };

//     fetchPosts();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Mentorship Advice</Text>
//       <FlatList
//         data={posts}
//         keyExtractor={(item) => item._id}
//         renderItem={({ item }) => (
//           <View style={styles.card}>
//             <Image source={{ uri: `http://localhost:5000${item.imagePath}` }} style={styles.image} />
//             <Text style={styles.title}>{item.title}</Text>
//             <StarRating value={item.ratings?.average || 0} readonly />
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f8f9fa',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   card: {
//     marginBottom: 20,
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     elevation: 2,
//     padding: 15,
//   },
//   image: {
//     width: '100%',
//     height: 200,
//     borderRadius: 5,
//     marginBottom: 10,
//   },
// });

// export default MentorshipAdvice;


import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import StarRating from '../components/StarRating';

const MentorshipAdvice = () => {
  const [posts, setPosts] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null); // Tracks which card is expanded

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/mentorships');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching mentorship posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const toggleExpandCard = (postId) => {
    setExpandedCard((prev) => (prev === postId ? null : postId));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mentorship Advice</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => toggleExpandCard(item._id)}
          >
            <Image
              source={{ uri: `http://localhost:5000${item.imagePath}` }}
              style={styles.image}
            />
            <Text style={styles.cardTitle}>{item.title}</Text>
            <StarRating value={item.ratings?.average || 0} readonly />
            
            {/* Show additional details when card is expanded */}
            {expandedCard === item._id && (
              <View style={styles.expandedContent}>
                <Text style={styles.author}>Author: {item.author}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 2,
    padding: 15,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  expandedContent: {
    marginTop: 10,
  },
  author: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#777',
  },
});

export default MentorshipAdvice;
