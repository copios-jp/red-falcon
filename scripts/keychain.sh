#!/bin/sh

KEY_CHAIN=mac-build.keychain
security create-keychain -p $CERT_PASS $KEY_CHAIN

# Make the keychain the default so identities are found
security default-keychain -s $KEY_CHAIN

# Unlock the keychain
security unlock-keychain -p $CERT_PASS $KEY_CHAIN

# Set keychain locking timeout to 3600 seconds
security set-keychain-settings -t 3600 -u $KEY_CHAIN

export APPLICATION_CERT=Applciation.p12
echo $CERT_OSX_DEVELOPER_ID_APPLICATION | base64 - --decode > $APPLICATION_CERT


export INSTALLER_CERT=Installer.p12
echo $CERT_OSX_DEVELOPER_ID_INSTALLER | base64 - --decode > $INSTALLER_CERT


# Add certificates to keychain and allow codesign to access them
echo "Add certificate to keychain"
security import $APPLICATION_CERT -k $KEY_CHAIN -P $CERT_PASS -T /usr/bin/codesign
security import $INSTALLER_CERT -k $KEY_CHAIN -P $CERT_PASS -T /usr/bin/codesign

echo "Add keychain to keychain-list"
security list-keychains -d user -s $KEY_CHAIN

echo "Settting key partition list"
security set-key-partition-list -S apple-tool:,apple:,codesign: -s -k $CERT_PASS $KEY_CHAIN

