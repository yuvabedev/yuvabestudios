"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { parseJobRow } from "@/lib/jobs-parser";
import { jobSchema, type JobFormData } from "@/lib/schemas/job.schema";
import type { JobRow } from "@/lib/types/jobs";

export function JobForm() {
  const [markdown, setMarkdown] = useState("");
  const [parseError, setParseError] = useState("");

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      niceToHave: [],
      benefits_remote: [],
      benefits_inperson: [],
      workCulture: [],
    },
  });

  const responsibilitiesField = useFieldArray({
    control,
    name: "responsibilities",
  });

  const requirementsField = useFieldArray({
    control,
    name: "requirements",
  });

  const niceToHaveField = useFieldArray({
    control,
    name: "niceToHave",
  });

  const benefitsRemoteField = useFieldArray({
    control,
    name: "benefits_remote",
  });

  const benefitsInPersonField = useFieldArray({
    control,
    name: "benefits_inperson",
  });

  const workCultureField = useFieldArray({
    control,
    name: "workCulture",
  });

  const handleParseMarkdown = () => {
    try {
      setParseError("");
      if (!markdown.trim()) {
        setParseError("Please paste markdown content");
        return;
      }

      // Create a mock JobRow and parse it
      const mockRow: JobRow = {
        id: "temp",
        description: markdown,
        created_at: new Date().toISOString(),
      };

      const parsed = parseJobRow(mockRow);

      // Populate form with parsed data
      setValue("title", parsed.title);
      setValue("department", parsed.department);
      setValue("location", parsed.location);
      setValue("type", parsed.type);
      setValue("level", parsed.level);
      setValue("posted", parsed.posted);
      setValue("summary", parsed.summary);
      setValue("responsibilities", parsed.responsibilities);
      setValue("requirements", parsed.requirements);
      setValue("niceToHave", parsed.niceToHave);
      setValue("portfolioRequirement", parsed.portfolioRequirement);
      setValue("benefits_remote", parsed.benefits?.remote || []);
      setValue("benefits_inperson", parsed.benefits?.inPerson || []);
      setValue("workCulture", parsed.workCulture);
      setValue("description", markdown);
    } catch (error) {
      setParseError(
        error instanceof Error ? error.message : "Failed to parse markdown"
      );
    }
  };

  const onSubmit = async (data: JobFormData) => {
    try {
      const response = await fetch("/api/jobs/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      alert("Job created successfully!");
      // Reset form
      setMarkdown("");
    } catch (error) {
      alert(
        "Error saving job: " +
          (error instanceof Error ? error.message : "Unknown error")
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Create Job Listing</h1>

      {/* Markdown Input */}
      <div className="mb-8">
        <label className="block text-sm font-medium mb-2">
          Paste Markdown Content
        </label>
        <textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          placeholder="Paste the job description markdown here..."
          className="w-full h-64 p-4 border rounded-lg font-mono text-sm"
        />
        <button
          type="button"
          onClick={handleParseMarkdown}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Parse Markdown
        </button>
        {parseError && <p className="text-red-600 mt-2">{parseError}</p>}
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Title *</label>
            <input
              {...register("title")}
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Job title"
            />
            {errors.title && (
              <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium mb-1">Department *</label>
            <input
              {...register("department")}
              type="text"
              className="w-full p-2 border rounded"
              placeholder="e.g., Marketing & Content"
            />
            {errors.department && (
              <p className="text-red-600 text-sm mt-1">{errors.department.message}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-1">Location *</label>
            <input
              {...register("location")}
              type="text"
              className="w-full p-2 border rounded"
              placeholder="e.g., Auroville, India"
            />
            {errors.location && (
              <p className="text-red-600 text-sm mt-1">{errors.location.message}</p>
            )}
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium mb-1">Type *</label>
            <select
              {...register("type")}
              className="w-full p-2 border rounded"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Remote">Remote</option>
            </select>
          </div>

          {/* Level */}
          <div>
            <label className="block text-sm font-medium mb-1">Level *</label>
            <select
              {...register("level")}
              className="w-full p-2 border rounded"
            >
              <option value="entry">Entry</option>
              <option value="experienced">Experienced</option>
            </select>
          </div>

          {/* Posted Date */}
          <div>
            <label className="block text-sm font-medium mb-1">Posted Date *</label>
            <input
              {...register("posted")}
              type="date"
              className="w-full p-2 border rounded"
            />
            {errors.posted && (
              <p className="text-red-600 text-sm mt-1">{errors.posted.message}</p>
            )}
          </div>
        </div>

        {/* Summary */}
        <div>
          <label className="block text-sm font-medium mb-1">Summary *</label>
          <textarea
            {...register("summary")}
            className="w-full p-2 border rounded h-24"
            placeholder="Job description summary"
          />
          {errors.summary && (
            <p className="text-red-600 text-sm mt-1">{errors.summary.message}</p>
          )}
        </div>

        {/* Responsibilities */}
        <div>
          <label className="block text-sm font-medium mb-2">Responsibilities *</label>
          <div className="space-y-2">
            {responsibilitiesField.fields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <input
                  {...register(`responsibilities.${index}`)}
                  className="flex-1 p-2 border rounded"
                  placeholder={`Responsibility ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => responsibilitiesField.remove(index)}
                  className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => responsibilitiesField.append("")}
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Add Responsibility
          </button>
          {errors.responsibilities && (
            <p className="text-red-600 text-sm mt-1">
              {errors.responsibilities.message}
            </p>
          )}
        </div>

        {/* Requirements */}
        <div>
          <label className="block text-sm font-medium mb-2">Requirements *</label>
          <div className="space-y-2">
            {requirementsField.fields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <input
                  {...register(`requirements.${index}`)}
                  className="flex-1 p-2 border rounded"
                  placeholder={`Requirement ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => requirementsField.remove(index)}
                  className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => requirementsField.append("")}
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Add Requirement
          </button>
          {errors.requirements && (
            <p className="text-red-600 text-sm mt-1">
              {errors.requirements.message}
            </p>
          )}
        </div>

        {/* Nice to Have */}
        <div>
          <label className="block text-sm font-medium mb-2">Nice to Have</label>
          <div className="space-y-2">
            {niceToHaveField.fields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <input
                  {...register(`niceToHave.${index}`)}
                  className="flex-1 p-2 border rounded"
                  placeholder={`Nice to have ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => niceToHaveField.remove(index)}
                  className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => niceToHaveField.append("")}
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Add Nice to Have
          </button>
        </div>

        {/* Portfolio Requirement */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Portfolio Requirement
          </label>
          <textarea
            {...register("portfolioRequirement")}
            className="w-full p-2 border rounded h-16"
            placeholder="What portfolio items are needed?"
          />
        </div>

        {/* Benefits Remote */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Benefits (Remote)
          </label>
          <div className="space-y-2">
            {benefitsRemoteField.fields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <input
                  {...register(`benefits_remote.${index}`)}
                  className="flex-1 p-2 border rounded"
                  placeholder={`Remote benefit ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => benefitsRemoteField.remove(index)}
                  className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => benefitsRemoteField.append("")}
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Add Remote Benefit
          </button>
        </div>

        {/* Benefits In Person */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Benefits (In-Person)
          </label>
          <div className="space-y-2">
            {benefitsInPersonField.fields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <input
                  {...register(`benefits_inperson.${index}`)}
                  className="flex-1 p-2 border rounded"
                  placeholder={`In-person benefit ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => benefitsInPersonField.remove(index)}
                  className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => benefitsInPersonField.append("")}
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Add In-Person Benefit
          </button>
        </div>

        {/* Work Culture */}
        <div>
          <label className="block text-sm font-medium mb-2">Work Culture</label>
          <div className="space-y-2">
            {workCultureField.fields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <input
                  {...register(`workCulture.${index}`)}
                  className="flex-1 p-2 border rounded"
                  placeholder={`Culture value ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => workCultureField.remove(index)}
                  className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => workCultureField.append("")}
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Add Culture Value
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isSubmitting ? "Creating..." : "Create Job Listing"}
        </button>
      </form>
    </div>
  );
}
