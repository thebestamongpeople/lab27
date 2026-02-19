import { styles } from "@/app/styles/styles";
import { ThemedText } from "@/components/themed-text";
import { usePomodoro } from "@/hooks/use-pomodoro";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function PomodoroTimer() {
  const { mode, time, isActive, toggleTimer, resetTimer, formatTime } = usePomodoro();

  return (
    <View style={styles.container}>
      <ThemedText style={styles.modeText}>{mode} Time</ThemedText>
      <Text style={styles.timerText}>{formatTime(time)}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleTimer}>
          <Text style={styles.buttonText}>{isActive ? "Pause" : "Start"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.resetButton]}
          onPress={resetTimer}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
