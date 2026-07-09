"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaTwitter, FaLinkedin, FaFacebook, FaLink } from "react-icons/fa";
import BlogSEO from "@/components/seo/BlogSEO";
import FaqSection from "@/components/FaqSection";

const objectdetectionFaqs = [
  {
    question: "What is AI-powered object detection?",
    answer:
      "RunAI-powered object detection is a computer vision technique that identifies and classifies objects within images using trained machine learning models.",
  },
  {
    question: " Can object detection be built using Flutter?",
    answer:
      "Yes. Flutter can capture images and display results, while AI inference is handled by a backend such as FastAPI.",
  },
  {
    question: "Why use FastAPI for AI inference?",
    answer:
      "FastAPI is lightweight, fast, and well-suited for serving machine learning models through APIs.",
  },
  {
    question: "Can this system scale to real-world applications?",
    answer:
      "Yes. The modular architecture allows models like YOLO or EfficientNet to replace simpler classifiers as needs grow.",
  },
];

export default function objectdetection() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <BlogSEO
        title="Build an AI Object Detection App with Flutter & FastAPI"
        description="Learn how to build an AI-powered object detection app using Flutter & FastAPI. Capture, classify, and display objects in real time."
        slug="object-detection-system-in-flutter"
        image="https://yuvabestudios.com/blog/flutter-banner.png"
        author="Hariprasath"
        role="AI/ML Developer"
        date="2025-10-07"
        readTime="7"
      />

      {/* Breadcrumbs */}
      <nav className="max-w-6xl mx-auto px-6 py-4 text-sm text-gray-600">
        <ul className="flex space-x-2">
          <li>
            <Link href="/" className="hover:text-[#5829C7]">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/blog" className="hover:text-[#5829C7]">
              Blog
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-800">object-detection-system-in-flutter</li>
        </ul>
      </nav>

      {/* Meta Info */}
      <div className="max-w-6xl mx-auto px-6 text-black text-sm mb-4">
        <p>
          Published on <span className="text-gray-800">October 7, 2025</span> ·
          7 mins read
        </p>
      </div>

      {/* Title */}
      <div className="max-w-6xl mx-auto px-6 mb-6">
        <motion.h1
          className="text-3xl md:text-5xl font-medium font-primary text-black leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Building an AI-Powered Object Detection System in Flutter.
        </motion.h1>

        <p className="text-lg italic text-black font-secondary my-4">
          From self-driving cars to smart shopping apps, object detection is
          quietly powering the world around us — and now, you can build it into
          your own app.
        </p>

        {/* Author field */}
        <p className="text-[16px] font-medium text-gray-500 mb-4">
          – By <span className="text-[#5829C7]">Hariprasath</span>, AI/ML
          Developer, Yuvabe Studios
        </p>

        <h3 className="text-xl font-medium font-secondary text-gray-800">
          Answer Summary:
        </h3>
        <p className="text-lg  text-black font-secondary mb-4">
          AI-powered object detection allows mobile apps to identify and
          classify objects from images in real time. By combining Flutter for
          the frontend and FastAPI for the backend, developers can build
          scalable, real-world object detection systems using pre-trained AI
          models with minimal infrastructure.
        </p>
      </div>

      {/* Hero Banner Image */}
      <div className="max-w-6xl h-auto mx-auto px-6 mb-12">
        <div className="relative w-full h-80  overflow-hidden shadow-lg">
          <Image
            src="/blog/flutter-banner.png"
            alt="Running LLMs Locally"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Blog Content */}
      <main className="max-w-6xl mx-auto py-8 px-6 space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="prose prose-lg prose-indigo"
        >
          {/* Introduction Section */}
          <section className=" rounded-2xl mb-12">
            <h2 className="text-3xl font-medium font-primary text-[#5829C7] mb-6">
              Why AI-Powered Object Detection Matters{" "}
            </h2>
            <p className="text-md  text-black font-secondary">
              From autonomous cars identifying pedestrians to e-commerce apps
              recommending products from photos,
              <strong>AI-powered object detection </strong> has become one of
              the most practical and impactful applications of artificial
              intelligence. What once required heavy infrastructure and complex
              pipelines can now be built with{" "}
              <strong>lightweight frameworks like Flutter and FastAPI, </strong>{" "}
              powered by <strong>pre-trained machine learning models. </strong>
            </p>
            <p className="text-md  text-black font-secondary mt-2">
              At Yuvabe Studios, we wanted to demonstrate just how accessible
              this technology has become. In this blog, we’ll walk you through
              building a real-time object detection Flutter app that captures an
              image, sends it to a FastAPI machine learning backend, and returns
              AI-generated classification results — all in real time.
            </p>

            <div className="mt-6 mx-auto items-center justify-center">
              <Image
                src="/blog/intro-banner.png"
                alt="Fine-tuning example illustration"
                width={800}
                height={450}
                className="rounded-lg mx-auto"
              />
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-medium font-primary text-[#5829C7] mb-6">
              How AI Object Detection Works
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Left Column - Text Content */}
              <div>
                <p className="text-black font-secondary text-lg mb-4">
                  At its core, an AI object detection system follows four simple
                  steps:
                </p>
                <ul className="list-disc list-inside space-y-2 text-black font-secondary text-[16px]">
                  <li>
                    <strong>Image Capture:</strong> Pre-trained models for image
                    classification, object detection, and more.
                  </li>
                  <li>
                    <strong>Image Processing:</strong> Speech-to-text, audio
                    classification, and transcription tools.
                  </li>
                  <li>
                    <strong>Prediction & Classification:</strong> Tools like
                    Stable Diffusion for converting words into visuals.
                  </li>
                  <li>
                    <strong>Displaying Results:</strong> Models like CLIP that
                    combine text, images, and audio in novel ways.
                  </li>
                </ul>
                <p className="text-black mt-4 text-[16px] font-secondary">
                  Think of it like asking a friend, “What do you see in this
                  picture?” — except the friend is an AI model trained on
                  thousands of images.
                </p>

                <h2 className="text-3xl font-medium font-primary text-[#5829C7] my-6">
                  Technologies We Used in This Project
                </h2>
                <p className="mb-2 font-secondary text-lg text-black">
                  To keep things simple yet powerful, we combined the following
                  stack:
                </p>
                <ul className="list-disc pl-6 space-y-2 font-secondary text-black">
                  <li>
                    <strong>
                      Flutter for Mobile Frontend (Camera Integration):
                    </strong>{" "}
                    For the mobile frontend (UI + camera integration).{" "}
                    <a
                      href="https://pub.dev/packages/camera"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Flutter Camera Package
                    </a>
                  </li>

                  <li>
                    <strong>FastAPI for AI Backend:</strong> A lightweight,
                    high-performance Python backend for serving the AI model.{" "}
                    <a
                      href="https://fastapi.tiangolo.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      FastAPI Documentation
                    </a>
                  </li>

                  <li>
                    <strong>Florence-2-base for Object Classification:</strong>{" "}
                    A pre-trained model used for object classification.{" "}
                    <a
                      href="https://huggingface.co/microsoft/Florence-2"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Florence-2 on Hugging Face
                    </a>
                  </li>

                  <li>
                    <strong>YOLO for Object Detection:</strong> Real-time object
                    detection model used alongside classification.{" "}
                    <a
                      href="https://docs.ultralytics.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      YOLO Documentation
                    </a>
                  </li>

                  <li>
                    <strong>HTTP Communication Between App and Backend:</strong>{" "}
                    To send captured images from Flutter to the backend.
                  </li>
                </ul>
                <p className="text-black mt-4">
                  This stack is efficient for prototyping but flexible enough to
                  scale with advanced models like YOLOv8 or EfficientNet.
                </p>
              </div>

              {/* Right Column - Image */}
              <div className="relative w-full h-full  overflow-hidden ">
                <Image
                  src="/blog/od-illustration.png"
                  alt="Running LLMs Locally Illustration"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-medium font-primary text-[#5829C7] mb-6">
              Setting Up the Flutter App
            </h2>
            <p className="mb-4 font-secondary text-lg text-black">
              Follow these steps to build a Flutter app that captures images and
              communicates with a FastAPI backend for AI-powered image
              classification.
            </p>
            <h3 className="text-xl font-medium font-primary text-black mt-6 mb-2">
              Step 1: Add Dependencies
            </h3>
            <p className="mb-2 font-secondary ">
              In your <code className="text-green-600">pubspec.yaml</code> file,
              add:
            </p>
            <div className="relative">
              <pre className="bg-gray-900 text-green-400 text-sm p-4 mb-6 overflow-x-auto">
                <code>{`dependencies:
  flutter:
    sdk: flutter
  camera: ^0.10.5+4
  http: ^0.13.6`}</code>
              </pre>
              <button
                onClick={() =>
                  navigator.clipboard.writeText(`dependencies:
  flutter:
    sdk: flutter
  camera: ^0.10.5+4
  http: ^0.13.6`)
                }
                className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded hover:bg-gray-600"
              >
                Copy
              </button>

              <p className="mb-2 font-secondary text-md">
                {" "}
                Then run: <br />
                Run <code className="text-green-600">flutter pub get</code> to
                install the packages.
              </p>
            </div>
            <h3 className="text-xl font-medium font-primary text-black mt-6 mb-2">
              Step 2: Implement Camera Functionality
            </h3>
            <p className="mb-2 font-secondary">
              We use the <strong>Flutter camera package </strong> to capture and
              send images for processing.Here’s how to initialize and use the
              camera:
            </p>
            <div className="relative">
              <pre className="bg-gray-900 text-green-400 text-sm p-4 mb-6 overflow-x-auto">
                <code>{`CameraController? _controller;
String? resultText;
bool isProcessing = false;

@override
void initState() {
  super.initState();
  initializeCamera();
}

Future<void> initializeCamera() async {
  final cameras = await availableCameras();
  _controller = CameraController(cameras[0], ResolutionPreset.medium);
  await _controller!.initialize();
  setState(() {});
}

Future<void> captureAndProcessImage() async {
  if (_controller == null || !_controller!.value.isInitialized) return;

  try {
    setState(() { isProcessing = true; });
    final XFile imageFile = await _controller!.takePicture();
    var response = await ApiService().predict(File(imageFile.path));
    setState(() {
      resultText = response?['results']?.values.first ?? 'No response';
      isProcessing = false;
    });
  } catch (e) {
    setState(() {
      resultText = "Error: $e";
      isProcessing = false;
    });
  }
}

@override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Capture & Classify")),
      body: Column(
        children: [
          Expanded(
            child: _controller == null || !_controller!.value.isInitialized
                ? Center(child: CircularProgressIndicator())
                : CameraPreview(_controller!),
          ),
          if (isProcessing) CircularProgressIndicator(),
          if (resultText != null)
            Padding(
              padding: const EdgeInsets.all(10),
              child: Text("Result: $resultText", style: TextStyle(fontSize: 18)),
            ),
          ElevatedButton(
            onPressed: captureAndProcessImage,
            child: Text("Capture & Classify"),
          ),
        ],
      ),
    );
  }
`}</code>
              </pre>
              <button
                onClick={() =>
                  navigator.clipboard.writeText(`CameraController? _controller;
String? resultText;
bool isProcessing = false;

@override
void initState() {
  super.initState();
  initializeCamera();
}

Future<void> initializeCamera() async {
  final cameras = await availableCameras();
  _controller = CameraController(cameras[0], ResolutionPreset.medium);
  await _controller!.initialize();
  setState(() {});
}

Future<void> captureAndProcessImage() async {
  if (_controller == null || !_controller!.value.isInitialized) return;

  try {
    setState(() { isProcessing = true; });
    final XFile imageFile = await _controller!.takePicture();
    var response = await ApiService().predict(File(imageFile.path));
    setState(() {
      resultText = response?['results']?.values.first ?? 'No response';
      isProcessing = false;
    });
  } catch (e) {
    setState(() {
      resultText = "Error: $e";
      isProcessing = false;
    });
  }
}
  
@override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Capture & Classify")),
      body: Column(
        children: [
          Expanded(
            child: _controller == null || !_controller!.value.isInitialized
                ? Center(child: CircularProgressIndicator())
                : CameraPreview(_controller!),
          ),
          if (isProcessing) CircularProgressIndicator(),
          if (resultText != null)
            Padding(
              padding: const EdgeInsets.all(10),
              child: Text("Result: $resultText", style: TextStyle(fontSize: 18)),
            ),
          ElevatedButton(
            onPressed: captureAndProcessImage,
            child: Text("Capture & Classify"),
          ),
        ],
      ),
    );
  }
`)
                }
                className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded hover:bg-gray-600"
              >
                Copy
              </button>
              <p>
                The
                <code className="text-green-600 font-secondary"> build() </code>
                method uses{" "}
                <code className="text-green-600"> CameraPreview </code>
                to display the live feed and shows the AI-powered app results
                after classification.
              </p>
            </div>
            <h2 className="text-3xl font-medium font-primary text-[#5829C7] my-6">
              Backend AI Inference with FastAPI
            </h2>
            <p className="mb-2 font-secondary font-regular">
              On the backend, <strong>FastAPI handles the AI inference.</strong>{" "}
              Flutter communicates with this backend via the{" "}
              <strong>http package. </strong>
            </p>
            <div className="relative">
              <pre className="bg-gray-900 text-green-400 text-sm p-4 mb-6 overflow-x-auto">
                <code>{`class ApiService {
  static const String baseUrl = "http://192.168.68.236:8000";

  Future<Map<String, dynamic>?> predict(File imageFile) async {
    try {
      var request = http.MultipartRequest("POST", Uri.parse("$baseUrl/predict"));
      request.files.add(await http.MultipartFile.fromPath('file', imageFile.path));
      var response = await request.send();
      if (response.statusCode == 200) {
        var responseData = await response.stream.bytesToString();
        return jsonDecode(responseData);
      }
      return null;
    } catch (e) {
      print("Error: $e");
      return null;
    }
  }
}`}</code>
              </pre>
              <button
                onClick={() =>
                  navigator.clipboard.writeText(`class ApiService {
  static const String baseUrl = "http://192.168.68.236:8000";

  Future<Map<String, dynamic>?> predict(File imageFile) async {
    try {
      var request = http.MultipartRequest("POST", Uri.parse("$baseUrl/predict"));
      request.files.add(await http.MultipartFile.fromPath('file', imageFile.path));
      var response = await request.send();
      if (response.statusCode == 200) {
        var responseData = await response.stream.bytesToString();
        return jsonDecode(responseData);
      }
      return null;
    } catch (e) {
      print("Error: $e");
      return null;
    }
  }
}`)
                }
                className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded hover:bg-gray-600"
              >
                Copy
              </button>
            </div>
            <p className="text-black font-secondary mb-4">
              This modular approach ensures you can later swap Florence-2-base
              with more advanced models like YOLOv8 or EfficientNet without
              rewriting the entire app.
            </p>
            <hr className="my-6 border-gray-300" />
            <div className="mb-6">
              <h2 className="text-3xl font-medium font-primary text-[#5829C7] mb-6">
                Final Thoughts: Why This Matters Beyond the Demo
              </h2>
              <p className="text-black font-secondary text-md mb-4">
                This project demonstrates more than just code — it shows how
                real-time object detection in Flutter is no longer limited to
                big tech companies. With frameworks like Flutter and FastAPI,
                even startups, researchers, or niche businesses can build
                AI-powered apps in days, not months.
              </p>

              <h2 className="text-2xl font-medium font-primary text-[#5829C7] mb-4">
                Taking Object Detection Beyond the Demo
              </h2>

              <ul className="list-disc list-inside space-y-2 text-black font-secondary text-[16px">
                <li>
                  <strong>Upgrade Models::</strong> Replace Florence-2 with YOLO
                  for real-time detection.
                </li>
                <li>
                  <strong>Visual Feedback: </strong> Display bounding boxes
                  around detected objects.
                </li>
                <li>
                  <strong>Accessibility:</strong> Add text-to-speech so results
                  are read aloud.
                </li>
                <li>
                  <strong>Business Use Cases: </strong> From quality checks in
                  manufacturing to visual search in e-commerce, the applications
                  are endless.
                </li>
              </ul>
              <p className="text-black mt-4 font-secondary text-md">
                At Yuvabe Studios, we believe projects like this are a glimpse
                into the future of AI: moving out of research papers and into
                the hands of businesses, creators, and communities.
              </p>
            </div>
          </section>

          <p className="text-gray-800 font-secondary font-medium mt-8">
            Want to build AI-powered apps tailored to your business needs?{" "}
            <Link
              href="/contact"
              className="text-indigo-600 underline hover:text-indigo-800 transition"
            >
              Let’s talk.
            </Link>{" "}
          </p>

          <FaqSection
            title="Frequently Asked Questions (FAQ)"
            description="Here’s Few things you need to know about Object Detection System"
            faqs={objectdetectionFaqs}
          />

          {/* Share Section */}
          <div className="border-t pt-6 mt-10">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              Share this article:
            </h4>
            <div className="flex flex-wrap gap-4">
              {/* Twitter/X */}
              <a
                href="https://twitter.com/intent/tweet?url=https://www.yuvabestudios.com/blog/object-detection-system-in-flutter&text=Check%20out%20this%20article%20about%20Running%20LLMs%20Locally!"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:opacity-80 transition"
              >
                <FaTwitter className="text-white" />
                <span>Twitter</span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/sharing/share-offsite/?url=https://www.yuvabestudios.com/blog/object-detection-system-in-flutter"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:opacity-80 transition"
              >
                <FaLinkedin className="text-white" />
                <span>LinkedIn</span>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/sharer/sharer.php?u=https://www.yuvabestudios.com/blog/object-detection-system-in-flutter"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:opacity-80 transition"
              >
                <FaFacebook className="text-white" />
                <span>Facebook</span>
              </a>

              {/* Copy Link */}
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    "https://www.yuvabestudios.com/blog/object-detection-system-in-flutter/",
                  );
                  alert("Link copied to clipboard!");
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:opacity-80 transition"
              >
                <FaLink className="text-white" />
                <span>Copy Link</span>
              </button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
