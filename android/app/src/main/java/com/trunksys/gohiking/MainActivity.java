package com.trunksys.gohiking;


import android.Manifest;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.util.Log;

import com.aerofs.reactnativeautoupdater.ReactNativeAutoUpdater;
import com.aerofs.reactnativeautoupdater.ReactNativeAutoUpdater.ReactNativeAutoUpdaterFrequency;
import com.aerofs.reactnativeautoupdater.ReactNativeAutoUpdater.ReactNativeAutoUpdaterUpdateType;
import com.aerofs.reactnativeautoupdater.ReactNativeAutoUpdaterActivity;
import com.aerofs.reactnativeautoupdater.ReactNativeAutoUpdaterPackage;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.oblador.vectoricons.VectorIconsPackage;

import java.util.Arrays;
import java.util.List;

import javax.annotation.Nullable;

public class MainActivity extends ReactNativeAutoUpdaterActivity {

    private static final int MY_PERMISSION_LOCATION = 111;

    /*************************************************
     * These methods are required for the ReactNativeAutoUpdater Part
     * ************************************************
     */

    @Override
    protected void onResume() {
        super.onResume();
    }

    @Override
    public void onRequestPermissionsResult(int requestCode,
                                           String permissions[], int[] grantResults) {
        Log.wtf("!!!!!!!!!!!!!!!", "onRequestPermissionsResult=>");
        switch (requestCode) {
            case MY_PERMISSION_LOCATION: {
                // If request is cancelled, the result arrays are empty.
                if (grantResults.length > 0
                        && grantResults[0] == PackageManager.PERMISSION_GRANTED) {

                    // permission was granted, yay! Do the
                    // contacts-related task you need to do.

                } else {

                    // permission denied, boo! Disable the
                    // functionality that depends on this permission.
                }
                return;
            }

            // other 'case' lines to check for other
            // permissions this app might request
        }
    }

    /**
     * Name of the JS Bundle file shipped with the app.
     * This file has to be added as an Android Asset.
     */
    @Nullable
    @Override
    protected String getBundleAssetName() {
        return "main.android.jsbundle";
    }

    /**
     * URL for the metadata of the update.
     * 雷! 只要找不到就會 Error
     */
    @Override
    protected String getUpdateMetadataUrl() {
        return "https://s3-ap-northeast-1.amazonaws.com/s3.trunksys.com/hiking/qa/packager/metadata.android.json";
//        return "http://192.168.2.101:3000/metadata.android.json";
    }

    /**
     * Name of the metadata file shipped with the app.
     * This metadata is used to compare the shipped JS code against the updates.
     */
    @Override
    protected String getMetadataAssetName() {
        return "metadata.android.json";
    }

    /**
     * If your updates metadata JSON has a relative URL for downloading
     * the JS bundle, set this hostname.
     * 雷! 只要找不到就會 Error
     */
    @Override
    protected String getHostnameForRelativeDownloadURLs() {
        return "https://s3-ap-northeast-1.amazonaws.com/s3.trunksys.com/hiking";
//        return "http://192.168.2.101:3000";
    }

    /**
     * Decide what type of updates to download.
     * Available options -
     * MAJOR - will download only if major version number changes
     * MINOR - will download if major or minor version number changes
     * PATCH - will download for any version change
     * default value - PATCH
     */
    @Override
    protected ReactNativeAutoUpdaterUpdateType getAllowedUpdateType() {
        return ReactNativeAutoUpdater.ReactNativeAutoUpdaterUpdateType.MINOR;
    }

    /**
     * Decide how frequently to check for updates.
     * Available options -
     * EACH_TIME - each time the app starts
     * DAILY     - maximum once per day
     * WEEKLY    - maximum once per week
     * default value - EACH_TIME
     */
    @Override
    protected ReactNativeAutoUpdaterFrequency getUpdateFrequency() {
        return ReactNativeAutoUpdaterFrequency.EACH_TIME;
    }

    /**
     * To show progress during the update process.
     */
    @Override
    protected boolean getShowProgress() {
        return true;
    }

    /*************************************************
     * These methods are plain old React Native stuff
     *************************************************
     * */

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "App";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     * 這邊改用 false 就是 prod 版，用 auto updater 更新
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
        // return false;
    }

    @Override
    public void updateFinished() {
        super.updateFinished();
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestLocationPermission();
    }


    /**
     * A list of packages used by the app. If the app uses additional views
     * or modules besides the default ones, add more packages here.
     */
    @Override
    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
                new ReactNativeAutoUpdaterPackage(),
                new MainReactPackage(),
                new VectorIconsPackage()
        );
    }

    private void requestLocationPermission() {
        int permissionCheck = ContextCompat.checkSelfPermission(this,
                Manifest.permission.ACCESS_FINE_LOCATION);

        if (permissionCheck == -1) {
            if (ActivityCompat.shouldShowRequestPermissionRationale(this,
                    Manifest.permission.ACCESS_FINE_LOCATION)) {
            } else {
                ActivityCompat.requestPermissions(this,
                        new String[]{Manifest.permission.ACCESS_FINE_LOCATION},
                        MY_PERMISSION_LOCATION);
            }
        }
    }

}
