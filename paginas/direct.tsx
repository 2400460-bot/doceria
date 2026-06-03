import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Logintela from './login';
import Principal from './paginaprincipal';
import Cadastrotela from './cadastro';
import Sobretela from './sobre';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Cadastro: undefined;
  Sobre: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        // ⭐ USUÁRIO LOGADO → telas principais
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home">
            {(props) => (
              <Principal
                {...props}
                onLogout={() => setIsAuthenticated(false)}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Sobre" component={Sobretela} />
        </Stack.Navigator>
      ) : (
        // 🔐 USUÁRIO NÃO LOGADO → apenas login e cadastro
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login">
            {(props) => (
              <Logintela
                {...props}
                onLogin={() => setIsAuthenticated(true)}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Cadastro" component={Cadastrotela} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}