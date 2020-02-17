function calculate_resolution(target_area, original_width, original_height)
{
	aspect_ratio = original_width / original_height
	new_height = square_root(target_area * aspect_ratio)
	new_width = target_area / new_height

	new_width = round(new_width)
	new_height = round(new_height)

	return (new_width, new_height)
}
