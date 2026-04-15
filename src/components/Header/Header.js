import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useSelector } from "react-redux";
import { NavigationService } from "../../navigator";
import { styles } from "../../asset/style/components/header"
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const Header = ({ location, toggleDrawer }) => {
    const state = useSelector(state => state)



    return (
        <>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { NavigationService.navigate('Dashboard') }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={styles.logo} source={require('../../asset/image/logo.png')} />
                        <Text style={{ fontSize: 24, paddingLeft: 5, color: '#0c0d0e' }}>texxano</Text>
                    </View>

                </TouchableOpacity>

         <TouchableOpacity onPress={toggleDrawer} style={styles.toggle}>
                        <Ionicons name="menu" size={30} color="#6c757d" />
                    </TouchableOpacity>
            </View>

        </>
    )
}

export default Header
