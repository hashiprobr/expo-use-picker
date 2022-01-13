expo-use-picker
===============

**A React Hook for simplifying basic usage of
[expo-document-picker](https://docs.expo.dev/versions/latest/sdk/document-picker/)**

This hook returns an object with two properties:

* a boolean state `loading`, that indicates whether it is waiting for a file to
  load;

* an asynchronous method `load`, that asks the user to choose the aforementioned
  file and returns its URI.


Peer dependencies
-----------------

``` json
{
    "expo": "^43.0.5",
    "expo-document-picker": "^10.0.3",
    "react": "^17.0.1",
    "react-native": ">=0.64.3"
}
```


Install
-------

With npm:

```
npm install @hashiprobr/expo-use-picker
```

With yarn:

```
yarn add @hashiprobr/expo-use-picker
```

With expo:

```
expo install @hashiprobr/expo-use-picker
```


Example
-------

``` js
import React, { useState } from 'react';

import { View, Text, Image, Button } from 'react-native';

import usePicker from '@hashiprobr/expo-use-picker';

export default function MyComponent() {
    const [uri, setUri] = useState();

    const picker = usePicker();

    async function onPress() {
        let result;
        try {
            result = await picker.load('image/*');
        } catch (error) {
            console.error(error);
        }
        if (result) {
            setUri(result);
        }
    }

    return (
        <View
            style={{
                flexGrow: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {picker.loading ? (
                <Text>loading...</Text>
            ) : (
                <>
                    {uri && (
                        <Image style={{ width: 250, height: 250 }} source={{ uri }} />
                    )}
                    <Button title="load" onPress={onPress} />
                </>
            )}
        </View>
    );
}
```
