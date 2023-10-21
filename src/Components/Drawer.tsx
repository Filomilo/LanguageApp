


const  CustomDrawerContent=(props)=> {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Help"
          onPress={() => Linking.openURL('https://mywebsite.com/help')}
        />
      </DrawerContentScrollView>
    );
  }