import { Pressable, Text, View } from 'react-native'
import { styles } from '../../../config/app-theme'
import { useProfileStore } from '../../store/profile-store'

export const ProfileScreen = () => {

  const name = useProfileStore( state => state.name )
  const email = useProfileStore( state => state.email )
  const changeProfile = useProfileStore( state => state.changeProfile )

  return (
    <View style={ styles.container }>
      <Text style={ styles.title }>{ name }</Text>
      <Text style={ styles.title }>{ email }</Text>
      <Pressable 
        style={ styles.primaryButton }
        onPress={ () => useProfileStore.setState({ email: 'tati@ups.cos'})}
      >
        <Text>Cambiar email</Text>
      </Pressable>
      <Pressable 
        style={ styles.primaryButton }
        onPress={ () => changeProfile('MateoLai', 'mateo@gma.cos')}
      >
        <Text>Regresa a Mateo</Text>
      </Pressable>
    </View>
  )
}
