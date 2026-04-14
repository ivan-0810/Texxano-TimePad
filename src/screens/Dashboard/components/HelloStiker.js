import React, { useEffect, useState, useRef } from 'react';
import { Text, View, Animated } from 'react-native';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';


const HelloStiker = () => {
    const state = useSelector((state) => state);
    const firstName = state.userData?.firstName;

    const [display, setDisplay] = useState(true);
    const fadeAnim = useState(new Animated.Value(0))[0];

    useEffect(() => {
        if (display) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500, 
                useNativeDriver: true,
            }).start();
        }
    }, [display]);

    useEffect(() => {
        if (display) {
            const timer = setTimeout(() => {
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 500, 
                    useNativeDriver: true,
                }).start(() => {
                    setDisplay(false); 
                });
            }, 7000);
            return () => clearTimeout(timer);
        }
    }, [display]);

    return (
        <>
            {display && (
                <Animated.View
                    style={{
                        opacity: fadeAnim,
                        backgroundColor: '#fff',
                        borderColor: '#ebf0f3',
                        borderWidth: 2,
                        borderRadius: 5,
                        flexDirection: 'row',
                        padding: 10,
                        marginBottom: 10,
                    }}>
                    <View style={{ width: '75%' }}>
                        <Text style={{ fontSize: 20, flexWrap: 'wrap' }}>
                            {(() => {
                                const currentHour = new Date().getHours()
                                if (currentHour >= 0 && currentHour < 12) {
                                    return (
                                        <><FormattedMessage id="Good.Morning" />, </>
                                    )
                                } else if (currentHour >= 12 && currentHour < 17) {
                                    return (
                                        <><FormattedMessage id="Good.Afternoon" />, </>
                                    )
                                } else if (currentHour >= 17) {
                                    return (
                                        <><FormattedMessage id="Good.Evening" />,</>
                                    )
                                } else {
                                    return (
                                        <Text>Hello</Text>
                                    )
                                }
                            })()}
                            {firstName}
                        </Text>
                        <Text style={{ fontSize: 14, flexWrap: "wrap" }}><FormattedMessage id="Enjoy.your.work.day.with.Texxano" /></Text>
                    </View>
                    {/* <Image style={{}} source={require('../../../asset/image/123.jpg')} /> */}
                </Animated.View>
            )}
        </>
    );
};

export default HelloStiker;
