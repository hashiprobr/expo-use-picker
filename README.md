expo-use-picker
===============

[PROJECT DISCONTINUED]

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
    "expo": "45.0.0",
    "expo-document-picker": "10.2.1",
    "react": "17.0.2",
    "react-native": "0.68.2"
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
