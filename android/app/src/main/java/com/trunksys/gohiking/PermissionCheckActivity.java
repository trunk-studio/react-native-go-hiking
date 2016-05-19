package com.trunksys.gohiking;

import android.Manifest;
import android.app.Activity;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AlertDialog;
import android.util.Log;
import android.widget.RelativeLayout;

public class PermissionCheckActivity extends Activity {

    private static final int MY_PERMISSION_LOCATION = 111;
    private static final String TAG = "GoHiking";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // create a layout and using Transparent_windowNoTitle
        RelativeLayout relativeLayout = new RelativeLayout(this);
        this.setContentView(relativeLayout);

        // request permissions when activity is creating.
        requestLocationPermission();
    }

    @Override
    public void onRequestPermissionsResult(int requestCode,
                                           @NonNull String permissions[],
                                           @NonNull int[] grantResults) {
        Log.wtf(TAG, "permissionCheck=>" + requestCode);
        switch (requestCode) {
            case MY_PERMISSION_LOCATION: {
                // If request is cancelled, the result arrays are empty.
                if (grantResults.length > 0
                        && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    Log.wtf(TAG, "location permission ok");
                    startMainActiviry();
                } else {
                    Log.wtf(TAG, "request location permission failed. try it again.");
                    dialogNeedPermissions(this);
                }
            }
        }
    }

    // show a dialog to tell why we need this permission then ask it.
    private void dialogNeedPermissions(final Activity activity) {
        Log.wtf(TAG, "dialogNeedPermissions => showing dialog...");
        new AlertDialog.Builder(this)
                .setIcon(R.mipmap.ic_launcher)
                .setTitle("台灣步道1指通")
                .setMessage("您是否願意給予我們檢查地理資訊的權限？\n\n" +
                        "我們需要這個權限為您呈現周遭的相關資料，" +
                        "如果您不同意，本 App 將無法運作。")
                .setPositiveButton("給予權限", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        ActivityCompat.requestPermissions(activity,
                                new String[]{
                                        Manifest.permission.ACCESS_FINE_LOCATION,
                                        Manifest.permission.ACCESS_COARSE_LOCATION,
                                },
                                MY_PERMISSION_LOCATION);
                    }
                })
                .setNegativeButton("離開", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        finish();
                    }
                })
                .show();
    }

    private void requestLocationPermission() {
        int permissionCheck = ContextCompat.checkSelfPermission(this,
                Manifest.permission.ACCESS_FINE_LOCATION);
        Log.wtf(TAG, "permissionCheck=>" + permissionCheck);

        if (permissionCheck != PackageManager.PERMISSION_GRANTED) {
            // show a msg to tell user why we need this permission
            if (ActivityCompat.shouldShowRequestPermissionRationale(this,
                    Manifest.permission.ACCESS_FINE_LOCATION)) {
                Log.wtf(TAG, "requestLocationPermission => show dialog.");
                dialogNeedPermissions(this);
            } else {
                Log.wtf(TAG, "requestLocationPermission => requestPermissions.");
                ActivityCompat.requestPermissions(this,
                        new String[]{
                                Manifest.permission.ACCESS_FINE_LOCATION,
                                Manifest.permission.ACCESS_COARSE_LOCATION,
                        },
                        MY_PERMISSION_LOCATION);
            }
        } else {
            startMainActiviry();
        }
    }

    private void startMainActiviry(){
        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);
    }

}
