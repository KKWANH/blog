<div width="100%" align="center"><h1>🎨 Color Saves Life!</h1></div>
<div width="100%" align="center"><img src="/assets/imgs/logo.png" align="center" width="50%"></div>
<div width="100%" align="center"><hr width="50" align="center"></div>

# 🚢 Welcome aboard, let me explain what it is

<div width="100%" align="center">
    <img width="49%" src="/assets/imgs/friedrichstrasse-road.jpg">
    <img width="49%" src="/assets/imgs/friedrichstrasse-road-grayscale.jpg">
</div>

> This example is for **achromatopsia**, which can see the world with only grayscale. There are lot more types of color-disability than chromatopsia.

**We all love Berlin.**
The picture above is a image of Friedrichstraße, which is close to Haupftbanhof(centeral station) of Berlin. You can see heavy traffic here, let's imagine a situation that you've become a color-blinded person. If the unexpected car, bicycle, comes in front of you, can you react and brake down your car at the exact right time? At this point, you can see color disability is critical for driving situation, which can hurt someone's life. Most of color disabled people cannot drive. Even getting drive license is not allowed in some countries.

Our **Color Saves Life** program comes at this point. Our goal is to attatch **transparent display** on front-window of vehicle*(Thanks to LG 😄)*, and simple sensors (normal camera in colorblind case). Boom! Now you can see AugmentedReality - Based - Driver Infortainment! In our program, we used Gazebo Simulator for prototype development. To adventure the our world of Gazebo Simulator, please [check here](#-world-of-simulation). You can find full storyline about the simulator here.

Another important feature of our program, is **Easy-to-develop**. If you just add your detecting algorithm and drawing part(opencv) for each frame in `plugins` folder, it is very easy develop new features. You can even run multiple plugins at same time, with plugin_master's features. [Check here](#-future-development-plan) and find more interesting ideas for future development. 

## 🎥 Presenation Matrials

Please visit [here](/assets/presentation/) to check our final videos and presentation files(pptx)! It may crash a little bit because of lack of font files, but I hope it works fine in your machines (:

## 🏛️ Architecture - Ideal

<img src="/assets/imgs/architecture-ideal.png" align="center">

## 🏛️ Architecture - Prototype

<img src="/assets/imgs/architecture-prototype.png" align="center">

## 📁 Folder Structure
```shell
./
 ├── ros2pkg/
 │   ├── image_subscriber/
 │   └── test_publisher/
 │
 ├── srcs/
 │   │   # Simulation Part
 │   ├── simulation_ws/src/
 │   │   ├── sim/        # ros2 pkg for gazbeo simulation world and vehicle model
 │   │   ├── teleop/     # ros2 pkg for gazbeo vehicle teleoperation
 │   │   └── tracking/   # ros2 pkg for detecting the eye position
 │   │
 │   │   # Submodules
 │   ├── yolov5/
 │   │
 │   │   # Python Client
 │   ├── assets/     # test images, fonts
 │   ├── plugins/    # You can deploy your own plugin here
 │   │   ├── color_disability/
 │   │   │   ├── model/ # Train by using YOLOv5
 │   │   │   ├── color_disability.py
 │   │   │   └── traffic_object.py
 │   │   ├── plugin.py
 │   │   └── plugin_master.py
 │   ├── disability_assistant.py
 │   ├── image_subscriber.py
 │   ├── main.py
 │   └── requirement.txt
 │
 ├── test_drive_data.tar.xz   # rosbag data of driving in gazebo to test the detection model
 │
 ├── LICENSE
 │
 ├── assets/                # asset folder for documentations
 │   ├── imgs/              # image files
 │   └── presentations/     # presentation matrials
 │
 └── README.md          # your entrypoint!
```

## ❓ How to Use

1. Download the docker image and unzip
```shell
# Download Releases/ColorSavesLife/ColorSavesLife.tar.bz2
bunzip2 ColorSavesLife.tar.bz2
```
2. Turn on the docker environment
```shell
docker load --input ColorSavesLife.tar
```
3. Open 3 terminal 
```shell
# Fist Terminal
docker run -it --env DISPLAY=$DISPLAY -v /tmp/.X11-unix:/tmp/.X11-unix csl:1.0 /bin/bash

# Second Terminal
docker ps # Check docker container ID
docker exec -it <container_ID> /bin/bash

# Thrid Terminal
docker ps
docker exec -it <container_ID> /bin/bash
```
4. Unzip rosbag data
```shell
cd ~/ColorSavesLife
tar -xf test_drive_data.tar.xz
```

5. Run the application
```shell
# First Terminal
cd ~/ColorSavesLife/srcs
python3 main.py

# Second Terminal
cd ~/ColorSavesLife
ros2 bag play test_drive_data

# Third Terminal
rviz2 # Add Image_msg -> Set topic (/car/camera1/image_raw)
```

## 🚦 World of Simulation

<div widht="100%" align="center">
    <img src="/assets/imgs/simulation_world.png" width="49%" align="center">
    <img src="/assets/imgs/car_road_view.png" width="49%" align="center">
</div>

https://github.com/lalywr2000/ColorSavesLife/assets/138571365/47cc0f78-8c28-4f0d-9dbd-17c3489e1b33

We used ROS2 and Gazebo simulation to implement and test our idea. The following demonstrates how to build from source, run the simulation, and process the video. We used Ubuntu 20.04 with ROS2 Foxy and Gazebo 11, assuming you have a similar working environment and correct installations.

```shell
cd srcs/simulation_ws
colcon build
```

#### 1. Test eye tracking simulator

https://github.com/lalywr2000/ColorSavesLife/assets/138571365/38cb0674-fa63-4da2-b476-9eef324a8226

https://github.com/lalywr2000/ColorSavesLife/assets/138571365/478ecd57-b25d-4ef7-8d45-f7937b8f9829

This program perceives the position of your eyes through a webcam and moves the camera object on Gazebo accordingly. This allows you to obtain a first-person perspective-like view within the simulation, mimicking your movements as if you were moving within the simulation environment.

Secify the path to the model in the `gui.ini` file located in `.gazebo`, and set the `gazebo_model_path` in the `package.xml` file to fit your local environment, you will be able to use the following features. Subscribe to the Image topic `car/camera1/image_raw` in RViz2 to monitor the first-person perspective.

```shell
# Terminal 1
source install/local_setup.bash
ros2 launch sim test.launch.py

# Terminal 2
source install/local_setup.bash
ros2 run sim camera_movement

# Terminal 3
source install/local_setup.bash
ros2 run tracking eye_tracking

# Terminal 4
rviz2
```

#### 2. Test teleoperation of the vehicle

https://github.com/lalywr2000/ColorSavesLife/assets/138571365/7bf3ccfd-fe2e-4467-bfd7-ec0203337a90

Now that you have the vision, it's time to drive. This time, we'll simulate driving in a world with simple roads, buildings, and traffic objects. By following the instructions below, you'll be able to move a vehicle forward, backward, and steer within the simulation. We'll use the `pygame` library for keyboard input with the WASD keys, assuming you have it installed.

Click on the empty pygame screen that pops up, then try using WASD keys to move the vehicle.

```shell
# Terminal 1
source install/local_setup.bash
ros2 launch sim sim.launch.py

# Terminal 2
source install/local_setup.bash
ros2 run teleop controller

# Terminal 3
rviz2
```
If you have successfully followed along up to this point, you should have an idea of how to simultaneously run eye tracking and vehicle driving. Now, utilize both functionalities to collect realistic visual data and provide it to vision processing model.


## DEMO!!

https://github.com/lalywr2000/ColorSavesLife/assets/138571365/6caf75e7-8876-491f-bd97-f706e9e7c992

https://github.com/lalywr2000/ColorSavesLife/assets/138571365/93db22f7-9478-4a3d-a849-f7ce598773f8


## 🤔 Future Development Plan
Color disability is not only disability that affects to normal life. In the report of WHO(World Health Organization), one of five people has problem of hearing [(who.int/health-topics/hearing-loss)](https://www.who.int/health-topics/hearing-loss#tab=tab_1). It is very important fact that 80% of them are living in low-income/mid-income countries, and hearing care interventions are cost-effective. If they can get help for their life with getting driving skills, this will effect a lot. With this solucation Solution, we can help them to drive much more safely and make their life much more easier and enjoyable for driving. As an example, we show you some of our future development plan for hearing disability and dementia. 

### 🔈 SoundVisualizer for HearingDisability
Sound sense is also so much important in driving situations and sirious problem. There are 450 million people who have hearing disability. Think about the emargency situation that ambulance is coming from your behind. If you have problem with hearing, this will cause worse circumstanses like car accident or a person who needs help cannot be rescued. But with SoundVisualizer plugin , that visualize any sound around your car and which direction does it comes from on front driver window. This will help you to react to the situation and make a right decision.

### AI Driving Assistant for Dementia
Dmentia is also a serious problem for driving. There are 55 million people who have dementia. Even their disablity is not effecting to their driving skills, they are not allowed to drive in some countries. Because they tend to pay less attention to the road and they are not able to make a right decision. With our AI Driving Assistant plugin for Dementia, that learn the driver's driving pattern and other driving data, that can show some warning message or make a sound when the driver is not paying attention to the road or detecting some unusual driving pattern.

So our platform is not only for color disability, but also for other disabilities. This has great potential to improve the lives of people with disabilities, making driving easier and more enjoyable for them. 

## 🫂 Team Member
- Kwanho Kim: [@KKWANH](https://github.com/KKWANH)
- Hokyung Park: [@Ho-mmd](https://github.com/ho-mmd)
- Sujong Ha: [@lalywr2000](https://github.com/lalywr2000)
- Shuta Ogura: [@Shuta-Syd](https://github.com/Shuta-Syd)
- Oscar Lopez

## 👍 References
- [Eye tracking](https://github.com/antoinelame/GazeTracking)
- [Gazebo world](https://bitbucket.org/theconstructcore/riabot/src/master/)
- [Vehicle model](https://www.thingiverse.com/thing:3076864)
