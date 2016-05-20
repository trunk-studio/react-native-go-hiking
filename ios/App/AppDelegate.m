/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import "RCTRootView.h"

#import "ReactNativeAutoUpdater.h"

@interface AppDelegate()
@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

#if DEBUG
  #warning "DEV MODE"

  #if TARGET_OS_SIMULATOR
    #warning "DEBUG SIMULATOR"
    jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.ios.bundle?platform=ios&dev=true"];
  #else
    jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
  #endif

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"App"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [[UIViewController alloc] init];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];

#else
  #warning "PROD MODE"
    jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
    ReactNativeAutoUpdater* updater = [ReactNativeAutoUpdater sharedInstance];
    [updater setDelegate:self];
    NSURL* defaultMetadataFileLocation = [[NSBundle mainBundle] URLForResource:@"metadata" withExtension:@"json"];
    [updater initializeWithUpdateMetadataUrl:[NSURL URLWithString:@"https://s3-ap-northeast-1.amazonaws.com/s3.trunksys.com/hiking/qa/packager/metadata.json"]
                     defaultJSCodeLocation:jsCodeLocation
               defaultMetadataFileLocation:defaultMetadataFileLocation ];
    [updater setHostnameForRelativeDownloadURLs:@"https://s3-ap-northeast-1.amazonaws.com/s3.trunksys.com/hiking"];
    [updater downloadUpdatesForType: ReactNativeAutoUpdaterPatchUpdate];
    [updater checkUpdate];

    NSURL* latestJSCodeLocation = [updater latestJSCodeLocation];

    self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    UIViewController *rootViewController = [UIViewController new];
    self.window.rootViewController = rootViewController;
    [self createReactRootViewFromURL:latestJSCodeLocation];
    [self.window makeKeyAndVisible];

#endif
  return YES;
}

- (void)createReactRootViewFromURL:(NSURL*)url {
  // Make sure this runs on main thread. Apple does not want you to change the UI from background thread.
  dispatch_async(dispatch_get_main_queue(), ^{
    RCTBridge* bridge = [[RCTBridge alloc] initWithBundleURL:url moduleProvider:nil launchOptions:nil];
    RCTRootView* rootView = [[RCTRootView alloc] initWithBridge:bridge moduleName:@"App" initialProperties:nil];
    self.window.rootViewController.view = rootView;
  });
}

@end
