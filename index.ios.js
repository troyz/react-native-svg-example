/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Animated,
    TouchableOpacity,
    View
} from 'react-native';
import { AnimatedLineProgress } from 'react-native-circular-progress';
import Svg,{
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Use,
    Defs,
    Stop
} from 'react-native-svg';

let AnimatedPath = Animated.createAnimatedComponent(Path);
let AnimatedCircle = Animated.createAnimatedComponent(Circle)

export default class AwesomeProject extends Component {
    constructor(props)
    {
        super(props);
        this.startAnimation = this.startAnimation.bind(this);
        this.state = {
            lineFillAnimation: new Animated.Value(0),
            circleFillAnimation: new Animated.Value(0)
        };
        this.dasharray = [Math.PI * 2 * 42];
        this.lineAnimation = this.state.lineFillAnimation.interpolate({
            inputRange: [
               0,
               100
            ],
            outputRange: [
               `M5 8 l0 0`,
               `M5 8 l215 0`,
            ]
        });
        this.circleAnimation = this.state.circleFillAnimation.interpolate({
            inputRange: [
               0,
               100,
            ],
            outputRange: [
                this.dasharray[0],
                0
            ]
        });
    }
    componentDidMount()
    {
        this.startAnimation();
    }
    startAnimation()
    {
        this.state.lineFillAnimation.setValue(0);
        this.state.circleFillAnimation.setValue(0);

        Animated.spring(
            this.state.lineFillAnimation,
            {
                toValue: 50,
                friction: 5,
                tension: 35
            }
        ).start();
        Animated.spring(
            this.state.circleFillAnimation,
            {
                toValue: 80,
                friction: 5,
                tension: 35
            }
        ).start();
    }
    render() {
        return (
            <View style={styles.container}>
                <Svg
                    height="100"
                    width="100">
                    <Circle
                        cx="50"
                        cy="50"
                        r="42"
                        stroke="#3d5875"
                        strokeWidth="8"
                        fill="transparent"
                    />
                    <AnimatedCircle
                        cx="50"
                        cy="50"
                        r="42"
                        origin="50,50"
                        rotate="-90"
                        stroke="#00e0ff"
                        strokeWidth="8"
                        strokeLinecap="round"
                        fill="transparent"
                        strokeDasharray={this.dasharray} strokeDashoffset={this.circleAnimation}
                    />
                </Svg>

                <Svg height="16" width="225">
                    <G fill="none" stroke="#3d5875">
                        <Path strokeLinecap="round" strokeWidth="8" d="M5 8 l215 0" />
                    </G>
                    <G fill="none" stroke="#00e0ff">
                        <AnimatedPath strokeLinecap="round" strokeWidth="8" d={this.lineAnimation}/>
                    </G>
                </Svg>
                <TouchableOpacity style={{marginTop:20}} onPress={this.startAnimation}>
                    <Text>Spring Animation</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
