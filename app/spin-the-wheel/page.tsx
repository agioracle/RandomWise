"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Input } from "@/components/ui/input";
import { X, Plus, Settings, Palette } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useMediaQuery } from "../../hooks/use-media-query";
import { getToolBySlug } from "@/data/tools";
import { ToolIntroduction } from "@/components/tool-introduction";
import SocialShareButtons from "@/components/SocialShareButtons";

interface WheelOption {
  text: string;
  color: string;
  icon?: string;
}

// Predefined wheel templates
const wheelTemplates = {
  default: [
    { text: "Option 1", color: "#6C5DD3", icon: "" },
    { text: "Option 2", color: "#4A3EAF", icon: "" },
    { text: "Option 3", color: "#6C5DD3", icon: "" },
    { text: "Option 4", color: "#4A3EAF", icon: "" },
    { text: "Option 5", color: "#6C5DD3", icon: "" },
    { text: "Option 6", color: "#4A3EAF", icon: "" },
  ],
  yesNo: [
    { text: "Yes", color: "#4ECDC4", icon: "✓" },
    { text: "No", color: "#FF6B6B", icon: "✗" },
    { text: "Yes", color: "#4ECDC4", icon: "✓" },
    { text: "No", color: "#FF6B6B", icon: "✗" },
    { text: "Yes", color: "#4ECDC4", icon: "✓" },
    { text: "No", color: "#FF6B6B", icon: "✗" },
  ],
  toBe: [
    { text: "To Be", color: "#3A86FF", icon: "🎭" },
    { text: "Not To Be", color: "#8338EC", icon: "💀" },
    { text: "To Be", color: "#3A86FF", icon: "🎭" },
    { text: "Not To Be", color: "#8338EC", icon: "💀" },
  ],
  dogCat: [
    { text: "Dog", color: "#FFD166", icon: "🐕" },
    { text: "Cat", color: "#F72585", icon: "🐈" },
    { text: "Dog", color: "#FFD166", icon: "🐕" },
    { text: "Cat", color: "#F72585", icon: "🐈" },
    { text: "Dog", color: "#FFD166", icon: "🐕" },
    { text: "Cat", color: "#F72585", icon: "🐈" },
  ],
};

export default function SpinTheWheelPage() {
  // Get current tool information
  const currentTool = getToolBySlug('spin-the-wheel');

  // State for wheel spinning
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [result, setResult] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [spinCount, setSpinCount] = useState<number>(0);
  const [wheelOptions, setWheelOptions] = useState<WheelOption[]>(wheelTemplates.default);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [newOption, setNewOption] = useState<WheelOption>({ text: "", color: "#6C5DD3", icon: "" });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentRotation, setCurrentRotation] = useState<number>(0);

  // Check if screen is mobile size
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Canvas reference for wheel drawing
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Predefined colors for wheel segments
  const predefinedColors = [
    "#6C5DD3", // Primary purple
    "#4A3EAF", // Darker purple
    "#FF6B6B", // Red
    "#4ECDC4", // Teal
    "#FFD166", // Yellow
    "#F72585", // Pink
    "#3A86FF", // Blue
    "#8AC926", // Green
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Draw the wheel on canvas
  useEffect(() => {
    drawWheel(currentRotation);
  }, [wheelOptions, isSpinning, currentRotation]);

  // Initialize wheel with Option 1 at the top
  useEffect(() => {
    // Calculate initial rotation to place Option 1 at the top (pointer position)
    const numOptions = wheelOptions.length;
    const segmentAngle = 360 / numOptions;
    const option1Index = 0; // Index of Option 1

    // Target angle is top position (270 degrees in standard canvas coordinates)
    const targetAngle = 270;
    const option1StartAngle = option1Index * segmentAngle;
    const option1MiddleAngle = option1StartAngle + (segmentAngle / 2);

    // Calculate rotation needed to place Option 1 at the top
    const initialRotation = (360 + targetAngle - option1MiddleAngle) % 360;
    setCurrentRotation(initialRotation);
  }, [wheelOptions.length]); // Only run when the number of options changes

  const drawWheel = (rotationAngle = 0) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set wheel dimensions
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    // Save context before rotation
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((rotationAngle * Math.PI) / 180);

    // Draw wheel segments
    const numOptions = wheelOptions.length;
    const anglePerOption = (2 * Math.PI) / numOptions;

    for (let i = 0; i < numOptions; i++) {
      const option = wheelOptions[i];
      const startAngle = i * anglePerOption;
      const endAngle = (i + 1) * anglePerOption;

      // Draw segment
      ctx.beginPath();
      ctx.moveTo(0, 0); // Center point (already translated)
      ctx.arc(
        0, 0, // Center point (already translated)
        radius,
        startAngle,
        endAngle
      );
      ctx.closePath();

      // Fill segment with option's color
      ctx.fillStyle = option.color;
      ctx.fill();

      // Add segment border for better visibility
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw text
      ctx.save();
      ctx.rotate(startAngle + (anglePerOption / 2));

      // Text styling
      ctx.textAlign = 'right';
      ctx.fillStyle = 'white';
      ctx.font = 'bold 14px Arial';

      // Draw icon if available (emoji or simple text icon)
      if (option.icon) {
        ctx.font = '16px Arial';
        ctx.fillText(option.icon, radius - 40, 0);
      }

      // Draw option text
      ctx.fillText(option.text, radius - 20, 5);
      ctx.restore();
    }

    // Draw center circle
    ctx.beginPath();
    ctx.arc(0, 0, 20, 0, 2 * Math.PI);
    ctx.fillStyle = '#FFD700'; // Gold center
    ctx.fill();
    ctx.closePath();

    // Add shine effect to center
    const gradient = ctx.createRadialGradient(
      -5, -5, 2,
      0, 0, 20
    );
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(1, 'rgba(255, 215, 0, 0.2)');
    ctx.fillStyle = gradient;
    ctx.fill();

    // Restore context after wheel drawing
    ctx.restore();

    // Draw pointer (fixed at top, not rotating with wheel)
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - radius - 10);
    ctx.lineTo(centerX - 10, centerY - radius + 10);
    ctx.lineTo(centerX + 10, centerY - radius + 10);
    ctx.closePath();
    ctx.fillStyle = '#FF2B2B';
    ctx.fill();
  };

  const spinWheel = () => {
    if (isSpinning) return; // Prevent spinning while already spinning

    setIsSpinning(true);
    setResult(null); // Clear previous result
    setSpinCount(prev => prev + 1);

    // Play sound if enabled
    if (soundEnabled) {
      const audio = new Audio('/sounds/wheel-spin.mp3');
      audio.play();
    }

    // Simulate spin duration
    const spinDuration = 3000; // milliseconds
    const numOptions = wheelOptions.length;
    const randomIndex = Math.floor(Math.random() * numOptions);

    // Calculate the rotation needed to land on the selected option
    // We need to adjust the rotation so the pointer points to the middle of the segment
    const segmentAngle = 360 / numOptions;

    // The rotation calculation needs to account for how the wheel is drawn and rotated
    // We want the selected option to end up at the top (270 degrees in standard canvas coordinates)
    const targetAngle = 270; // Top position (in degrees)
    const selectedSegmentStartAngle = randomIndex * segmentAngle;
    const selectedSegmentMiddleAngle = selectedSegmentStartAngle + (segmentAngle / 2);

    // Calculate how much we need to rotate to get the selected segment to the top
    // We need to add enough rotation to ensure we make at least 5 full spins plus the needed angle
    const angleToTarget = (360 + targetAngle - selectedSegmentMiddleAngle) % 360;

    // Total rotation: multiple full spins + precise angle to land on the selected segment
    const totalRotation = 360 * 5 + angleToTarget;

    const selectedOption = wheelOptions[randomIndex].text;

    // Animate the spin
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Start from 0 rotation for consistent behavior
    let startRotation = 0;
    let rotationAngle = startRotation;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / spinDuration, 1);

      // Easing function for slowing down the spin
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
      rotationAngle = startRotation + (easeOut(progress) * totalRotation);

      // Clear and redraw
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the wheel with rotation
      drawWheel(rotationAngle);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Store the final rotation angle for future renders
        setCurrentRotation(rotationAngle % 360); // Keep it between 0-360 degrees
        setIsSpinning(false);
        setResult(selectedOption);
      }
    };

    requestAnimationFrame(animate);
  };

  const addOption = () => {
    if (newOption.text.trim() && wheelOptions.length < 8) {
      setWheelOptions([...wheelOptions, { ...newOption, text: newOption.text.trim() }]);
      setNewOption({ text: "", color: "#6C5DD3", icon: "" });
    }
  };

  const updateOption = (index: number) => {
    if (newOption.text.trim()) {
      const updatedOptions = [...wheelOptions];
      updatedOptions[index] = { ...newOption, text: newOption.text.trim() };
      setWheelOptions(updatedOptions);
      setNewOption({ text: "", color: "#6C5DD3", icon: "" });
      setEditingIndex(null);
    }
  };

  const startEditOption = (index: number) => {
    // Ensure icon is always a string, defaulting to empty string if undefined
    setNewOption({
      ...wheelOptions[index],
      icon: wheelOptions[index].icon || ""
    });
    setEditingIndex(index);
  };

  const cancelEdit = () => {
    setNewOption({ text: "", color: "#6C5DD3", icon: "" });
    setEditingIndex(null);
  };

  const removeOption = (index: number) => {
    if (wheelOptions.length > 2) {
      const newOptions = [...wheelOptions];
      newOptions.splice(index, 1);
      setWheelOptions(newOptions);
      if (editingIndex === index) {
        cancelEdit();
      }
    }
  };

  // Handle customize button click based on screen size
  const handleCustomizeClick = () => {
    if (isMobile) {
      setDialogOpen(true);
    } else {
      setIsCustomizing(!isCustomizing);
    }
  };

  // Close dialog and turn off customizing mode
  const handleCloseCustomization = () => {
    setDialogOpen(false);
    setIsCustomizing(false);
  };

  // When dialog closes, reset editing state
  const handleDialogOpenChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setEditingIndex(null);
      setNewOption({ text: "", color: "#6C5DD3", icon: "" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0D0D23]">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center py-12 px-4 mt-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">{currentTool?.name || 'Spinning your wheels?'}</h1>
        <p className="text-xl text-gray-300 mb-2">{currentTool?.description || 'Let the wheel determine your next move!'}</p>

        <div className="flex flex-col items-center md:items-start mb-8">
          <SocialShareButtons />
        </div>

        <div className="flex flex-col md:flex-row w-full max-w-5xl gap-6">
          {isCustomizing && !isMobile ? (
            <>
              {/* Wheel Card - When customizing (half width) */}
              <Card className="w-full md:w-1/2 bg-[#1A1A3A] border-[#3D3D6B] text-white rounded-xl overflow-hidden">
                {/* Wheel Display Area */}
                <div className="p-8 flex justify-center items-center">
                  <div className="wheel-container relative w-64 h-64">
                    <canvas
                      ref={canvasRef}
                      width={300}
                      height={300}
                      className="w-full h-full"
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="px-8 pb-4 flex justify-between gap-4">
                  <Button
                    onClick={spinWheel}
                    disabled={isSpinning}
                    className="flex-1 bg-[#6C5DD3] hover:bg-[#5A4BBF] text-white py-6"
                  >
                    Spin
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-[#3D3D6B] text-white hover:bg-[#2A2A4A] py-6"
                    onClick={handleCustomizeClick}
                  >
                    Customize
                  </Button>
                </div>

                {/* Templates */}
                <div className="border-t border-[#3D3D6B] px-8 py-4">
                  <h4 className="font-medium mb-3">Predefined Wheel Templates</h4>
                  <div className="grid grid-cols-1 gap-2">
                    <Button
                      onClick={() => setWheelOptions(wheelTemplates.yesNo)}
                      className="bg-[#4ECDC4] hover:bg-[#3ECFA4] text-white py-2"
                    >
                      Yes/No
                    </Button>
                    <Button
                      onClick={() => setWheelOptions(wheelTemplates.toBe)}
                      className="bg-[#3A86FF] hover:bg-[#2F7FFD] text-white py-2"
                    >
                      To Be or Not To Be
                    </Button>
                    <Button
                      onClick={() => setWheelOptions(wheelTemplates.dogCat)}
                      className="bg-[#FFD166] hover:bg-[#FFC95C] text-white py-2"
                    >
                      Dog or Cat
                    </Button>
                  </div>
                </div>

                {/* Sound Option */}
                <div className="border-t border-[#3D3D6B] px-8 py-4">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-white">Sound</span>
                    <Switch
                      checked={soundEnabled}
                      onCheckedChange={setSoundEnabled}
                      className="data-[state=checked]:bg-[#6C5DD3]"
                    />
                  </div>
                </div>
              </Card>

              {/* Customization Panel - Only visible when customizing */}
              <Card className="w-full md:w-1/2 bg-[#1A1A3A] border-[#3D3D6B] text-white rounded-xl overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Customize Wheel</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCloseCustomization}
                      className="text-gray-400 hover:text-white"
                    >
                      <X size={18} />
                    </Button>
                  </div>

                  {/* Add/Edit Option Form */}
                  <div className="space-y-4 mb-6 p-4 bg-[#2A2A4A] rounded-lg">
                    <h4 className="font-medium">{editingIndex !== null ? 'Edit Option' : 'Add New Option'}</h4>

                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-gray-300 mb-1 block">Text</label>
                        <Input
                          value={newOption.text}
                          onChange={(e) => setNewOption({...newOption, text: e.target.value})}
                          placeholder="Enter option text"
                          className="bg-[#1A1A3A] border-[#3D3D6B]"
                        />
                      </div>

                      <div>
                        <label className="text-sm text-gray-300 mb-1 block">Color</label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {predefinedColors.map((color, idx) => (
                            <button
                              key={idx}
                              className={`w-8 h-8 rounded-full border-2 ${newOption.color === color ? 'border-white' : 'border-transparent'}`}
                              style={{ backgroundColor: color }}
                              onClick={() => setNewOption({...newOption, color})}
                            />
                          ))}
                        </div>
                        <div className="flex items-center gap-2">
                          <Input
                            type="color"
                            value={newOption.color}
                            onChange={(e) => setNewOption({...newOption, color: e.target.value})}
                            className="w-12 h-8 p-0 border-0"
                          />
                          <Input
                            value={newOption.color}
                            onChange={(e) => setNewOption({...newOption, color: e.target.value})}
                            placeholder="#RRGGBB"
                            className="flex-1 bg-[#1A1A3A] border-[#3D3D6B]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm text-gray-300 mb-1 block">Icon (optional)</label>
                        <Input
                          value={newOption.icon || ''}
                          onChange={(e) => setNewOption({...newOption, icon: e.target.value})}
                          placeholder="Icon URL or emoji"
                          className="bg-[#1A1A3A] border-[#3D3D6B]"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      {editingIndex !== null ? (
                        <>
                          <Button
                            onClick={() => updateOption(editingIndex)}
                            className="flex-1 bg-[#6C5DD3] hover:bg-[#5A4BBF]"
                            disabled={!newOption.text.trim()}
                          >
                            Update
                          </Button>
                          <Button
                            onClick={cancelEdit}
                            variant="outline"
                            className="border-[#3D3D6B] hover:bg-[#2A2A4A]"
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <Button
                          onClick={addOption}
                          className="flex-1 bg-[#6C5DD3] hover:bg-[#5A4BBF]"
                          disabled={!newOption.text.trim() || wheelOptions.length >= 8}
                        >
                          <Plus size={16} className="mr-1" /> Add Option
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Options List */}
                  <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                    <h4 className="font-medium mb-2">Current Options ({wheelOptions.length}/8)</h4>
                    {wheelOptions.map((option, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-[#2A2A4A] rounded-lg">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: option.color }}
                          />
                          <span>{option.text}</span>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => startEditOption(index)}
                            className="text-gray-400 hover:text-white h-8 w-8 p-0"
                          >
                            <Settings size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeOption(index)}
                            disabled={wheelOptions.length <= 2}
                            className="text-red-400 hover:text-red-300 h-8 w-8 p-0"
                          >
                            <X size={16} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </>
          ) : (
            /* Wheel Card - When not customizing (centered, full width) */
            <Card className="w-full max-w-md mx-auto bg-[#1A1A3A] border-[#3D3D6B] text-white rounded-xl overflow-hidden">
              {/* Wheel Display Area */}
              <div className="p-8 flex justify-center items-center">
                <div className="wheel-container relative w-72 h-72">
                  <canvas
                    ref={canvasRef}
                    width={300}
                    height={300}
                    className="w-full h-full"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="px-8 pb-4 flex justify-between gap-4">
                <Button
                  onClick={spinWheel}
                  disabled={isSpinning}
                  className="flex-1 bg-[#6C5DD3] hover:bg-[#5A4BBF] text-white py-6"
                >
                  Spin
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-[#3D3D6B] text-white hover:bg-[#2A2A4A] py-6"
                  onClick={handleCustomizeClick}
                >
                  Customize
                </Button>
              </div>

              {/* Sound Option */}
              <div className="border-t border-[#3D3D6B] px-8 py-4">
                <div className="flex justify-between items-center py-2">
                  <span className="text-white">Sound</span>
                  <Switch
                    checked={soundEnabled}
                    onCheckedChange={setSoundEnabled}
                    className="data-[state=checked]:bg-[#6C5DD3]"
                  />
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Stats (optional) */}
        {spinCount > 0 && (
          <div className="mt-8 text-center text-gray-300">
            <p>Total spins: {spinCount}</p>
            {result && <p>Last result: {result}</p>}
          </div>
        )}
      </main>

      {/* SEO Introduction */}
      <ToolIntroduction slug="spin-the-wheel" />

      {/* Footer */}
      <Footer className="bg-[#0A0A1B] text-gray-400" />

      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={handleDialogOpenChange}>
        <DialogContent className="bg-[#1A1A3A] border-[#3D3D6B] text-white rounded-xl overflow-hidden max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle>Customize Wheel</DialogTitle>
            </div>
          </DialogHeader>

          {/* Predifined Options */}
          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
            <h4 className="font-medium mb-2">Predefined Wheel Templates</h4>
            <div className="grid grid-cols-1 gap-2">
              <Button
                onClick={() => setWheelOptions(wheelTemplates.yesNo)}
                className="bg-[#4ECDC4] hover:bg-[#3ECFA4] text-white py-2"
              >
                Yes/No
              </Button>
              <Button
                onClick={() => setWheelOptions(wheelTemplates.toBe)}
                className="bg-[#3A86FF] hover:bg-[#2F7FFD] text-white py-2"
              >
                To Be or Not To Be
              </Button>
              <Button
                onClick={() => setWheelOptions(wheelTemplates.dogCat)}
                className="bg-[#FFD166] hover:bg-[#FFC95C] text-white py-2"
              >
                Dog or Cat
              </Button>
            </div>
          </div>

          {/* Add/Edit Option Form */}
          <div className="space-y-4 mb-6 p-4 bg-[#2A2A4A] rounded-lg">
            <h4 className="font-medium">{editingIndex !== null ? 'Edit Option' : 'Add New Option'}</h4>

            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-300 mb-1 block">Text</label>
                <Input
                  value={newOption.text}
                  onChange={(e) => setNewOption({...newOption, text: e.target.value})}
                  placeholder="Enter option text"
                  className="bg-[#1A1A3A] border-[#3D3D6B]"
                />
              </div>

              <div>
                <label className="text-sm text-gray-300 mb-1 block">Color</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {predefinedColors.map((color, idx) => (
                    <button
                      key={idx}
                      className={`w-8 h-8 rounded-full border-2 ${newOption.color === color ? 'border-white' : 'border-transparent'}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setNewOption({...newOption, color})}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="color"
                    value={newOption.color}
                    onChange={(e) => setNewOption({...newOption, color: e.target.value})}
                    className="w-12 h-8 p-0 border-0"
                  />
                  <Input
                    value={newOption.color}
                    onChange={(e) => setNewOption({...newOption, color: e.target.value})}
                    placeholder="#RRGGBB"
                    className="flex-1 bg-[#1A1A3A] border-[#3D3D6B]"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-300 mb-1 block">Icon (optional)</label>
                <Input
                  value={newOption.icon || ''}
                  onChange={(e) => setNewOption({...newOption, icon: e.target.value})}
                  placeholder="Icon URL or emoji"
                  className="bg-[#1A1A3A] border-[#3D3D6B]"
                />
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              {editingIndex !== null ? (
                <>
                  <Button
                    onClick={() => updateOption(editingIndex)}
                    className="flex-1 bg-[#6C5DD3] hover:bg-[#5A4BBF]"
                    disabled={!newOption.text.trim()}
                  >
                    Update
                  </Button>
                  <Button
                    onClick={cancelEdit}
                    variant="outline"
                    className="border-[#3D3D6B] hover:bg-[#2A2A4A]"
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  onClick={addOption}
                  className="flex-1 bg-[#6C5DD3] hover:bg-[#5A4BBF]"
                  disabled={!newOption.text.trim() || wheelOptions.length >= 8}
                >
                  <Plus size={16} className="mr-1" /> Add Option
                </Button>
              )}
            </div>
          </div>

          {/* Options List */}
          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
            <h4 className="font-medium mb-2">Current Options ({wheelOptions.length}/8)</h4>
            {wheelOptions.map((option, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-[#2A2A4A] rounded-lg">
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: option.color }}
                  />
                  <span>{option.text}</span>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => startEditOption(index)}
                    className="text-gray-400 hover:text-white h-8 w-8 p-0"
                  >
                    <Settings size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeOption(index)}
                    disabled={wheelOptions.length <= 2}
                    className="text-red-400 hover:text-red-300 h-8 w-8 p-0"
                  >
                    <X size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Animation Styles */}
      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 3s cubic-bezier(0.1, 0.7, 0.1, 1);
        }
      `}</style>
    </div>
  );
}
