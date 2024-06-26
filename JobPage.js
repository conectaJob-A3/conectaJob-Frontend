import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Linking,
  Alert
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'

export default function App() {
  const [profile, setProfile] = useState({
    name: 'João Silva',
    role: 'Programador Pleno',
    about:
      'Sou um programador pleno com mais de 5 anos de experiência em diversas tecnologias e uma paixão por resolver problemas complexos. Tenho habilidades em desenvolvimento web, bancos de dados e metodologias ágeis.',
    skills: ['JavaScript', 'HTML & CSS', 'React', 'Node.js', 'Python', 'SQL'],
    experience: [
      'Empresa X - Desenvolvedor Frontend (2019-2021)',
      'Empresa Y - Desenvolvedor Full Stack (2021-2023)',
      'Empresa Z - Programador Pleno (2023-Presente)'
    ],
    email: 'joao.silva@exemplo.com',
    linkedin: 'https://linkedin.com/in/joaosilva',
    profileImage: null,
    bannerImage: null,
    resumeLink: 'https://example.com/curriculo'
  })

  const handleDownloadResume = () => {
    Linking.openURL(profile.resumeLink)
  }

  const handleImagePicker = async imageType => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (permissionResult.granted === false) {
      Alert.alert(
        'Permissão necessária',
        'A permissão para acessar a biblioteca de mídia é necessária.'
      )
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })

    if (!result.cancelled) {
      setProfile({ ...profile, [imageType]: result.uri })
    }
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => handleImagePicker('bannerImage')}>
        <View style={styles.bannerContainer}>
          {profile.bannerImage ? (
            <Image
              source={{ uri: profile.bannerImage }}
              style={styles.bannerImage}
            />
          ) : (
            <Text style={styles.placeholderText}>
              Toque para selecionar uma imagem de banner
            </Text>
          )}
        </View>
      </TouchableOpacity>
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={() => handleImagePicker('profileImage')}>
          <Image
            source={{ uri: profile.profileImage }}
            style={styles.profilePicture}
          />
        </TouchableOpacity>
        <Text style={styles.profileName}>{profile.name}</Text>
        <Text style={styles.profileRole}>{profile.role}</Text>
      </View>
      <View style={styles.aboutContainer}>
        <Text style={styles.sectionTitle}>Sobre Mim</Text>
        <TextInput
          style={styles.aboutContent}
          value={profile.about}
          multiline
          onChangeText={text => setProfile({ ...profile, about: text })}
          editable
        />
      </View>
      <View style={styles.skillsContainer}>
        <Text style={styles.sectionTitle}>Habilidades</Text>
        {profile.skills.map((skill, index) => (
          <TextInput
            key={index}
            style={styles.skillItem}
            value={skill}
            onChangeText={text => handleSkillsChange(text, index)}
            editable
          />
        ))}
      </View>
      <View style={styles.experienceContainer}>
        <Text style={styles.sectionTitle}>Experiência</Text>
        {profile.experience.map((exp, index) => (
          <TextInput
            key={index}
            style={styles.experienceItem}
            value={exp}
            onChangeText={text => handleExperienceChange(text, index)}
            editable
          />
        ))}
        <TouchableOpacity
          onPress={handleDownloadResume}
          style={styles.resumeButton}
        >
          <Text style={styles.resumeButtonText}>Baixar Currículo</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contactContainer}>
        <Text style={styles.sectionTitle}>Contato</Text>
        <TextInput
          style={styles.contactContent}
          value={profile.email}
          onChangeText={text => setProfile({ ...profile, email: text })}
          editable
        />
        <TextInput
          style={styles.contactContent}
          value={profile.linkedin}
          onChangeText={text => setProfile({ ...profile, linkedin: text })}
          editable
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9'
  },
  bannerContainer: {
    aspectRatio: 16 / 9,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 5,
    borderColor: '#fff'
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10
  },
  profileRole: {
    fontSize: 18,
    color: '#777',
    marginBottom: 10
  },
  aboutContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#fff',
    elevation: 3,
    borderRadius: 10,
    padding: 15
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333'
  },
  aboutContent: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24
  },
  skillsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#fff',
    elevation: 3,
    borderRadius: 10,
    padding: 15
  },
  skillItem: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8
  },
  experienceContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#fff',
    elevation: 3,
    borderRadius: 10,
    padding: 15
  },
  experienceItem: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8
  },
  resumeButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10
  },
  resumeButtonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  contactContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#fff',
    elevation: 3,
    borderRadius: 10,
    padding: 15
  },
  contactContent: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555'
  },
  placeholderText: {
    fontSize: 16,
    color: '#888'
  }
})
