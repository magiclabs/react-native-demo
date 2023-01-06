import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, Alert } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as _ from 'lodash';
import { ENV } from '../config/env';

export default function HeaderDropdown (props: { setEnv: (arg0: string) => void; env: string | undefined; }) {

    const handleChangeENV = () => {
        Alert.alert(
            'Change Env',
            '',
            _.map(_.keys(ENV),
                (env) => ({
                    text: env,
                    style: 'default',
                    onPress: () => onPressChangeEnv(env)
                })
            )
        )
    }

    const onPressChangeEnv = (env: string) => {
        props.setEnv(env);
    }

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleChangeENV}
        >
            <View style={styles.textWrap}>
                <Text style={styles.text}>{_.toUpper(props.env)}</Text>
                <View style={styles.iconWrap}>
                    <Ionicons
                        name={'ios-arrow-down'}
                        color={'rgba(0, 0, 0, 0.7)'}
                        size={14}
                    />
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    textWrap: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        display: 'flex',
        alignItems: 'center',
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold'
    },
    iconWrap: {
        marginTop: 2,
        marginLeft: 3
    }
})
