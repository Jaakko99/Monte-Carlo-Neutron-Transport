#include <iostream>
#include <vector>
#include <cmath>
#include <random>

// Define Pi for math calculations
const double PI = 3.14159265358979323846;

struct Neutron {
    double x = 0, y = 0, z = 0; // Start at center (0,0,0)
    double dx, dy, dz; // Direction vector
    bool alive = true; // Neutron is alive until it interacts
};

int main (){
    // Simulation parameters
    std::mt19937 rng(42); // Random number generator with fixed seed for reproducibility
    std::uniform_real_distribution<double> dist(0.0, 1.0); // Uniform distribution for random numbers

    // Physics parameters
    double core_radius = 8.7; // Radius of the U-235 core in cm
    double mean_free_path = 17.0; // Average distance between collisions in cm
    int generations = 20; // How many "steps" to simulate

    std::vector<Neutron> population;
    population.push_back(Neutron{0,0,0, 0,0,1}); // Start with one neutron moving in the +z direction

    std::cout <<"Target: " << core_radius << "cm Uranium Sphere"<<std::endl;
    
    for (int g = 0; g < generations; ++g) {
        std::vector<Neutron> next_gen;

        for (auto &n : population) {
            if (!n.alive) continue; // Skip dead neutrons

            // 1. Move the neutron (Monte Carlo distance)

            double distance = -mean_free_path * std::log(dist(rng));

            // Pick random 3D direction
            double theta = 2.0 * PI * dist(rng); // Azimuthal angle
            double phi = std::acos(1.0 - 2.0 * dist(rng)); // Polar angle
            n.dx = std::sin(phi) * std::cos(theta);
            n.dy = std::sin(phi) * std::sin(theta);
            n.dz = std::cos(phi);

            n.x += n.dx * distance;
            n.y += n.dy * distance;
            n.z += n.dz * distance;

            // 2. Check.. did it escape the core?
            double r = std::sqrt(n.x*n.x + n.y*n.y + n.z*n.z);
            if (r > core_radius) {
                n.alive = false; // Neutron escaped
                continue;
            }

            // 3. Collision Fission or Capture?
            if (dist(rng) < 0.85) { // 85% chance of fission
            next_gen.push_back(Neutron{n.x, n.y, n.z, 0,0,0}); // New neutron from fission
            next_gen.push_back(Neutron{n.x, n.y, n.z, 0,0,0}); // New neutron from fission
            // Note: We add two new ones (simplified multiplication)
        } else {
            n.alive = false; // Neutron captured, no new neutrons
        }
    }

    population = next_gen; // Move to the next generation
    std::cout << "Gen "<< g << ":" << population.size() <<  "neutrons" << std::endl;

    if (population.empty()) {
        std::cout << "Chain reaction died out." << std::endl;
        break;
    }

    if (population.size() > 10000) { // Arbitrary threshold for supercriticality
        std::cout << "Chain reaction is supercritical!" << std::endl;
        break;
    }
}
    return 0;
}
